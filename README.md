# 中文繁體打字練習 (Traditional Chinese Typing Practice)

A React application for practicing typing in both English and Traditional Chinese with zhuyin input.

## Features

- Choose between English and Traditional Chinese typing practice
- One-minute timed typing tests
- Results showing Words Per Minute (WPM) and accuracy
- Previous and high score tracking using local storage
- Color-coded feedback for correct and incorrect typing

### English Practice

- Type English text
- Character-by-character feedback with green for correct and red for incorrect
- WPM calculated as total characters typed divided by 4.7

### Chinese Practice

- Type zhuyin (bopomofo) for Chinese characters
- Shows Chinese characters with corresponding zhuyin
- Visual feedback for correct/incorrect zhuyin input
- WPM calculated based on number of Chinese characters completed

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository
   ```
   git clone https://github.com/yourusername/typing-practice.git
   ```

2. Install dependencies
   ```
   cd typing-practice
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open http://localhost:3000 in your browser

## Technologies Used

- React
- TypeScript
- CSS
- Local Storage API

## License

This project is licensed under the MIT License
