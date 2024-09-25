# Audio Processing and Transcription

This project provides a set of functions to process audio files, convert them from M4A to MP3 format, split large audio files into smaller chunks, transcribe the audio using OpenAI's Whisper model, and summarize the transcriptions using OpenAI's GPT-3.5-turbo model. The results are saved to text files.

## Features

- **Convert M4A to MP3**: Converts M4A audio files to MP3 format.
- **Split Audio into Chunks**: Splits large audio files into smaller chunks to handle size limitations.
- **Transcribe Audio**: Transcribes audio files using OpenAI's Whisper model.
- **Summarize Text**: Summarizes the transcriptions using OpenAI's GPT-3.5-turbo model.
- **Save Results**: Saves the transcriptions and summaries to text files.

## Prerequisites

- Node.js
- OpenAI API Key
- FFmpeg

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Set up your OpenAI API key:

   ```sh
   export OPENAI_API_KEY=your_openai_api_key
   ```

4. Ensure FFmpeg is installed and available in your PATH.

## Usage

1. Place your M4A audio file in the project directory.

2. Update the [`audioFilePath`](command:_github.copilot.openSymbolFromReferences?%5B%22audioFilePath%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22path%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A146%2C%22character%22%3A42%7D%7D%5D%5D "Go to definition") variable in [`index.mjs`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ming.fang/code/summary/index.mjs") with the path to your audio file:

   ```javascript
   const audioFilePath = "./your_audio_file.m4a";
   ```

3. Run the script:

   ```sh
   node index.mjs
   ```

4. The script will process the audio file, transcribe it, summarize the transcription, and save the results to text files.

## Functions

### [`convertM4AtoMP3(inputPath, outputPath)`](<command:_github.copilot.openSymbolFromReferences?%5B%22convertM4AtoMP3(inputPath%2C%20outputPath)%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22path%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A14%2C%22character%22%3A9%7D%7D%5D%5D> "Go to definition")

Converts an M4A file to MP3 format.

### [`splitAudioIntoChunks(inputPath, outputPrefix, chunkDuration)`](<command:_github.copilot.openSymbolFromReferences?%5B%22splitAudioIntoChunks(inputPath%2C%20outputPrefix%2C%20chunkDuration)%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22path%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A28%2C%22character%22%3A9%7D%7D%5D%5D> "Go to definition")

Splits an audio file into smaller chunks based on the specified duration.

### [`transcribeAudio(filePath)`](<command:_github.copilot.openSymbolFromReferences?%5B%22transcribeAudio(filePath)%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22path%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A65%2C%22character%22%3A15%7D%7D%5D%5D> "Go to definition")

Transcribes the audio file using OpenAI's Whisper model.

### [`summarizeText(text)`](<command:_github.copilot.openSymbolFromReferences?%5B%22summarizeText(text)%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22path%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A123%2C%22character%22%3A15%7D%7D%5D%5D> "Go to definition")

Summarizes the given text using OpenAI's GPT-3.5-turbo model.

### [`saveSummaryToFile(summary, audioFilePath)`](<command:_github.copilot.openSymbolFromReferences?%5B%22saveSummaryToFile(summary%2C%20audioFilePath)%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22path%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A146%2C%22character%22%3A15%7D%7D%5D%5D> "Go to definition")

Saves the summary to a text file.

### [`saveTranscriptsToFile(summary, audioFilePath)`](<command:_github.copilot.openSymbolFromReferences?%5B%22saveTranscriptsToFile(summary%2C%20audioFilePath)%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22path%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A157%2C%22character%22%3A15%7D%7D%5D%5D> "Go to definition")

Saves the transcription to a text file.

### [`processAudioFile(filePath)`](<command:_github.copilot.openSymbolFromReferences?%5B%22processAudioFile(filePath)%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22path%22%3A%22%2FUsers%2Fming.fang%2Fcode%2Fsummary%2Findex.mjs%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A168%2C%22character%22%3A15%7D%7D%5D%5D> "Go to definition")

Processes the audio file by converting, transcribing, summarizing, and saving the results.

## Example

```javascript
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
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [OpenAI](https://openai.com/)
- [FFmpeg](https://ffmpeg.org/)

For any issues or contributions, please open an issue or submit a pull request on GitHub.
