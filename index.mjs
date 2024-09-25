import fs from "fs";
import { promisify } from "util";
import OpenAI from "openai";
import ffmpeg from "fluent-ffmpeg";
const { unlink, writeFile, createReadStream, existsSync, renameSync } = fs;
const unlinkAsync = promisify(unlink);
const writeFileAsync = promisify(writeFile);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_CHUNK_SIZE = 25 * 1024 * 1024; // 25 MB in bytes

function convertM4AtoMP3(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputPath)
      .toFormat("mp3")
      .on("end", () => {
        renameSync(outputPath, outputPath.replace(".mp3", "-done.mp3"));
        resolve(outputPath.replace(".mp3", "-done.mp3"));
      })
      .on("error", (err) => reject(err))
      .save(outputPath);
  });
}

function splitAudioIntoChunks(inputPath, outputPrefix, chunkDuration) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputPath, (err, metadata) => {
      if (err) {
        reject(err);
        return;
      }

      const duration = metadata.format.duration;
      const numChunks = Math.ceil(duration / chunkDuration);
      let chunkPromises = [];

      for (let i = 0; i < numChunks; i++) {
        const start = i * chunkDuration;
        const output = `${outputPrefix}_chunk${i}.mp3`;

        const chunkPromise = new Promise((resolveChunk, rejectChunk) => {
          ffmpeg()
            .input(inputPath)
            .setStartTime(start)
            .setDuration(chunkDuration)
            .output(output)
            .on("end", () => resolveChunk(output))
            .on("error", (err) => rejectChunk(err))
            .run();
        });

        chunkPromises.push(chunkPromise);
      }

      Promise.all(chunkPromises)
        .then((chunkFiles) => resolve(chunkFiles))
        .catch((err) => reject(err));
    });
  });
}

async function transcribeAudio(filePath) {
  const mp3Path = filePath.replace(".m4a", ".mp3");
  const finalMp3Path = filePath.replace(".m4a", "-done.mp3");

  try {
    if (!existsSync(finalMp3Path)) {
      if (!existsSync(mp3Path)) {
        console.log("Converting M4A to MP3...");
        await convertM4AtoMP3(filePath, mp3Path);
        console.log("Conversion complete.");
      } else {
        console.log("Incomplete MP3 file found. Reconverting...");
        await convertM4AtoMP3(filePath, mp3Path);
      }
    } else {
      console.log("Converted MP3 file already exists. Skipping conversion.");
    }

    console.log("Checking file size...");
    const stats = existsSync(finalMp3Path)
      ? fs.statSync(finalMp3Path)
      : fs.statSync(mp3Path);
    if (stats.size > MAX_CHUNK_SIZE) {
      console.log("File is too large. Processing in chunks...");
      const chunkDuration = 300; // 5 minutes per chunk
      const chunks = await splitAudioIntoChunks(
        finalMp3Path || mp3Path,
        filePath.replace(".m4a", ""),
        chunkDuration
      );

      let fullTranscription = "";
      for (const chunk of chunks) {
        console.log(`Transcribing chunk: ${chunk}`);
        const chunkTranscription = await openai.audio.transcriptions.create({
          file: createReadStream(chunk),
          model: "whisper-1",
          language: "en",
        });
        fullTranscription += chunkTranscription.text + " ";
        await unlinkAsync(chunk);
      }
      return fullTranscription.trim();
    } else {
      console.log("Starting transcription...");
      const transcription = await openai.audio.transcriptions.create({
        file: createReadStream(finalMp3Path || mp3Path),
        model: "whisper-1",
        language: "en",
      });
      return transcription.text;
    }
  } catch (error) {
    console.error("Error in transcription:", error);
    throw error;
  }
}

async function summarizeText(text) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes text.",
        },
        {
          role: "user",
          content: `Please summarize the following text:\n\n${text}`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error in summarization:", error);
    throw error;
  }
}

async function saveSummaryToFile(summary, audioFilePath) {
  const summaryFilePath = audioFilePath.replace(".m4a", ".summary.txt");
  try {
    await writeFileAsync(summaryFilePath, summary, "utf8");
    console.log(`Summary saved to: ${summaryFilePath}`);
  } catch (error) {
    console.error("Error saving summary to file:", error);
    throw error;
  }
}

async function saveTranscriptsToFile(summary, audioFilePath) {
  const summaryFilePath = audioFilePath.replace(".m4a", ".transcripts.txt");
  try {
    await writeFileAsync(summaryFilePath, summary, "utf8");
    console.log(`Summary saved to: ${summaryFilePath}`);
  } catch (error) {
    console.error("Error saving summary to file:", error);
    throw error;
  }
}

async function processAudioFile(filePath) {
  console.log("Transcribing audio...");
  const transcription = await transcribeAudio(filePath);
  console.log("Transcription complete.");

  console.log("Saving transcripts to file...");
  await saveTranscriptsToFile(summary, filePath);

  console.log("Generating summary...");
  const summary = await summarizeText(transcription);
  console.log("Summary complete.");

  console.log("Saving summary to file...");
  await saveSummaryToFile(summary, filePath);

  return { transcription, summary };
}

// Example usage
const audioFilePath = "./audio2210354086.m4a";

processAudioFile(audioFilePath)
  .then(({ transcription, summary }) => {
    console.log("\nTranscription:");
    console.log(transcription);
    console.log("\nSummary:");
    console.log(summary);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
