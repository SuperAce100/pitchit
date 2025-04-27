# PitchIt 🚀

Transform any GitHub repository into a professional pitch deck with just one click. PitchIt analyzes your codebase and automatically generates a comprehensive presentation covering technical details and market research.

## Features

- 🔍 **Codebase Analysis**: Deep dive into your repository's structure and functionality
- 📊 **Technical Brief Generation**: Automatically creates detailed technical documentation
- 📈 **Market Research**: Analyzes your project's market potential and competitive landscape
- 🎯 **Smart Slide Deck**: Generates a professional presentation combining technical and market insights
- 🖥️ **Interactive Viewer**: Beautiful UI to present and navigate through slides

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pitchit.git
cd pitchit
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your API keys and configuration
```

4. Run the application:
```bash
python main.py
```

## Usage

1. Start the application
2. Paste a GitHub repository URL
3. Wait for the analysis to complete
4. View your automatically generated pitch deck

## Project Structure

```
pitchit/
├── backend/           # Core analysis and processing logic
├── public/           # Frontend components and UI
├── .chainlit/        # Chainlit configuration
├── main.py          # Main application entry point
└── schema.json      # Data models and schemas
```

## Requirements

- Python 3.8+
- Dependencies listed in `pyproject.toml`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Built with [Chainlit](https://chainlit.io/)
- Powered by advanced AI models for code analysis and market research
