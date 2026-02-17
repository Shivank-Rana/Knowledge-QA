# **Prompts Used During Development**

This document outlines the key prompts and guidance used to develop the **Knowledge Q&A with Gemini AI** app.  
It explains where AI assisted, and what I manually checked or refined to ensure everything works smoothly.

---

## **Project Setup**

**Prompt:**  
*"Generate a React + Vite project with TypeScript and Tailwind CSS, ready for document upload and AI Q&A."*

**AI Role:**  
- Suggested folder/file structure, dependencies, and initial configuration.

**Manual Checks:**  
- Verified package compatibility.  
- Updated `package.json` and `vite.config.ts`.  
- Ensured TypeScript and Tailwind settings were correct.

---

## **Components**

### **Document Upload**
**Prompt:**  
*"Build a file upload component that validates text files (.txt, .md, .json)."*

**AI Role:**  
- Provided base component code and validation logic.

**Manual Checks:**  
- Added UI feedback and error handling.  
- Styled component with Tailwind for a polished interface.

---

### **Document List**
**Prompt:**  
*"Create a document list showing preview and delete functionality."*

**AI Role:**  
- Generated React component structure with basic preview.

**Manual Checks:**  
- Integrated deletion with Supabase.  
- Limited preview length and formatted content properly.  

---

### **Question-Answer Component**
**Prompt:**  
*"Create a component to ask questions, get answers using Google Gemini AI, and show sources."*

**AI Role:**  
- Suggested AI call logic, prompts for Gemini, and source formatting.

**Manual Checks:**  
- Integrated with `generateAnswerWithAI`.  
- Added loading states, error handling, and polished UI.  

---

### **System Health Status**
**Prompt:**  
*"Add a status page showing backend, database, and AI connection health."*

**AI Role:**  
- Suggested layout, color coding, and status icons.

**Manual Checks:**  
- Integrated with Supabase and Gemini API checks.  
- Tested real-time updates and connection reliability.

---

## **Navigation & UX**

**Prompt:**  
*"Create clear navigation tabs: Upload / Ask / Health."*

**AI Role:**  
- Generated initial tab structure and state logic.

**Manual Checks:**  
- Styled tabs with Tailwind.  
- Ensured responsive design and smooth tab switching.

---

## **Error Handling & Validation**

**Prompt:**  
*"Handle empty inputs and missing documents gracefully."*

**AI Role:**  
- Suggested basic validation logic.

**Manual Checks:**  
- Customized error messages for clarity.  
- Ensured proper UX feedback for users.

---

## **Documentation & Notes**

**Prompt:**  
*"Generate concise documentation and notes about AI usage and manual checks."*

**AI Role:**  
- Drafted README and AI_NOTES.md content.  
- Explained AI usage, LLM provider, and limitations.

**Manual Checks:**  
- Added personal info and project-specific instructions.  
- Verified clarity, accuracy, and readability.

---

