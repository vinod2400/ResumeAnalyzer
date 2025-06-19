# ResumeRadar - AI-Powered Resume Grader

ResumeRadar is a full-stack web application that uses AI to analyze resumes and provide comprehensive feedback to help job seekers improve their applications.

## 🚀 Features

- **AI-Powered Analysis**: Uses Google's Gemini AI to provide detailed resume feedback
- **Comprehensive Scoring**: 0-100 score with detailed breakdown
- **ATS Optimization**: Ensures resumes pass through Applicant Tracking Systems
- **Strengths & Weaknesses**: Identifies key areas of improvement
- **Actionable Suggestions**: Provides specific recommendations for enhancement
- **Job Description Matching**: Optional job description comparison for targeted optimization
- **Beautiful UI**: Modern, responsive design with smooth animations
- **PDF Support**: Secure PDF text extraction and analysis

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building

### Backend
- **Node.js** with Express
- **Multer** for file uploads
- **pdf-parse** for PDF text extraction
- **Google Gemini AI API** for resume analysis

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API key

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-radar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   ADD the `.env` file and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   ```

4. **Get your Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env` file

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

This will start both the frontend (Vite) and backend (Node.js) servers concurrently:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
resume-radar/
├── src/
│   ├── components/
│   │   ├── AnalysisResults.tsx    # Results display component
│   │   ├── FileUpload.tsx         # PDF upload component
│   │   ├── Header.tsx             # App header component
│   │   ├── JobDescriptionInput.tsx # Job description input
│   │   └── LoadingSpinner.tsx     # Loading indicator
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles
├── server.js                      # Express backend server
├── .env.example                   # Environment variables template
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

## 🔌 API Endpoints

### POST `/api/analyze-resume`
Analyzes an uploaded PDF resume.

**Request:**
- `Content-Type: multipart/form-data`
- `resume`: PDF file
- `jobDescription`: (optional) Job description text

**Response:**
```json
{
  "success": true,
  "analysis": {
    "score": 85,
    "strengths": ["Array of strengths"],
    "weaknesses": ["Array of weaknesses"],
    "suggestions": ["Array of suggestions"],
    "atsOptimizedExperience": "Optimized experience section",
    "overallSummary": "Summary of the candidate"
  },
  "extractedText": "Preview of extracted text..."
}
```

### GET `/api/health`
Health check endpoint.

## 🎨 Design Features

- **Modern Glassmorphism UI**: Beautiful backdrop blur effects and transparency
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Engaging micro-interactions and transitions
- **Professional Color Scheme**: Blue, emerald, and orange accent colors
- **Interactive Components**: Hover states and loading animations
- **Accessibility**: Proper contrast ratios and semantic HTML

## 🔒 Security Features

- File type validation (PDF only)
- File size limits (10MB max)
- Secure file handling with memory storage
- Error handling and validation
- CORS protection

## 🚀 Deployment

The application is ready for deployment to platforms like:
- **Netlify** (frontend + serverless functions)
- **Vercel** (full-stack deployment)
- **Railway** (full-stack with database)
- **Heroku** (full-stack deployment)

For deployment, ensure your environment variables are properly configured in your hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [API documentation](https://ai.google.dev/gemini-api/docs)
2. Verify your environment variables are correctly set
3. Ensure your Gemini API key has proper permissions
4. Check the server logs for detailed error messages

---

**Built with ❤️ using React, Node.js, and OPEN ROUTER API(you can use GEMINI API also)**
