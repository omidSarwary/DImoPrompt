# DimoPrompt 🎤

DimoPrompt is a modern, experimental teleprompter web app built with React.  
It is designed to help users deliver scripts more naturally by providing visual guidance for pronunciation, tone, pacing, and emphasis.

> ⚠️ This is a learning / experimental project ("vibe-coded") and may contain rough edges or incomplete features.

---

## 🌐 Live Demo

[View App](YOUR_DEPLOYED_URL_HERE)

---

## Screenshots

<!-- Add screenshots here -->
<!-- Example:
![Main UI](./screenshots/main.png)
![Editor](./screenshots/editor.png)
-->

---

## Features

- Adjustable scrolling speed for comfortable reading
- Mirror mode for teleprompter hardware setups
- Text-to-Speech on hover for pronunciation help
- Performance-based script formatting system
- Visual cues for:
  - Tone (happy, serious, excited, etc.)
  - Volume (loud, soft, strong)
  - Stress and emphasis
  - Speed changes
  - Pauses
- Phonetic guidance for difficult words

---

## Purpose

DimoPrompt is built especially for:

- Non-native English speakers
- Content creators (YouTube, presentations)
- Public speakers and learners

It helps users:

- Improve pronunciation
- Control pacing and delivery
- Add emotion and clarity to speech

---

## How It Works

The app uses a custom **markup-based scripting system** that transforms plain text into a guided teleprompter experience.

Example:

Welcome everyone! Today we will learn how to [stress:take CONTROL] of your [secondary:mindset].
[pause:short][/pause]
Remember, practice makes perfect!

---

## Teleprompter Tag System

Tags work similarly to HTML and must always be opened and closed properly.

### Examples

[tone:calm]This is calm[/tone]
[stress]Important word[/stress]
[pause:short][/pause]

### Supported Tags

| Tag                        | Description           |
| -------------------------- | --------------------- |
| `[volume:loud][/volume]`   | Bold, energetic voice |
| `[volume:soft][/volume]`   | Soft, gentle voice    |
| `[volume:strong][/volume]` | Strong emphasis       |
| `[tone:excited][/tone]`    | Excited tone 🎉       |
| `[tone:serious][/tone]`    | Serious tone 💼       |
| `[tone:happy][/tone]`      | Happy tone 😊         |
| `[tone:sad][/tone]`        | Sad tone 😔           |
| `[stress][/stress]`        | Strong emphasis       |
| `[secondary][/secondary]`  | Softer/secondary text |
| `[pause:short][/pause]`    | • short pause         |
| `[pause:long][/pause]`     | •• long pause         |
| `[speed:up][/speed]`       | Faster delivery       |
| `[speed:down][/speed]`     | Slower delivery       |

---

## AI Script Usage (Optional)

This system works especially well with AI-generated scripts.

You can prompt an AI to:

- Add tone, stress, and pacing
- Format scripts for delivery
- Highlight pronunciation

Output becomes directly usable inside the teleprompter.

---

## Tech Stack

- React (Create React App)
- JavaScript
- Web Speech API (Text-to-Speech)

---

## Getting Started

### Clone the repository:

```bash
git clone YOUR_REPO_URL_HERE

cd dimoprompt
```

### Install dependencies:

```bash
npm install
```

### Run the app:

```bash
npm start
```

Then open:  
http://localhost:3000

---

## Build

```bash
npm run build
```

---

## Limitations

- Not production-hardened
- Minimal error handling
- No backend / persistence
- Experimental UI/UX decisions

---

## Roadmap (Future Ideas)

- Save/load scripts
- Cloud sync
- Better mobile experience
- Custom themes
- Voice recording + playback

---

## License

This project is licensed under the MIT License.

---

## Author

Built as a learning project.

---

## Notes

This project was created as part of experimenting with building real tools using minimal prior coding experience.  
The goal was to turn an idea into a functional product—not perfection.
