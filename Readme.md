# QuickQuest 🎯

QuickQuest is a **full-stack Next.js application** built for classrooms and examinations.  
It flashes **randomized questions** on screen with a **time limit per question**.  
Students join using their **full name**, but they answer on their **own paper** — the system only controls and displays the exam flow.

---

## ✨ Features
- 🎲 **Randomized Question Display** – Each quiz session shuffles questions  
- ⏱️ **Timed Questions** – Customizable countdown per question (default: 25 seconds)  
- 📝 **Student Registration** – Students join with their full name  
- 📺 **Display Only Mode** – Prevents on-screen answering, students write on paper  
- 🔑 **Teacher Login** – Secure login for teachers/admins to manage quizzes  
- ✍️ **Create or Upload Questions** – Teachers can:
  - Manually create questions via the admin panel  
  - Upload bulk questions using **CSV** or **JSON** files  
- 🎓 **Teacher Control Panel** – Manage exam sessions, questions, and timers  

---

## 🛠️ Tech Stack
- **Frontend & Backend:** [Next.js](https://nextjs.org/) (Full-stack React framework)  
- **Database:** MySQL (via [Prisma](https://www.prisma.io/) or [PlanetScale](https://planetscale.com/))  
- **Authentication:** NextAuth.js (for teacher/admin login)  
- **Styling:** Tailwind CSS  
- **Deployment:** Vercel / Docker  

---

## 🚀 How It Works
1. **Teacher Login**
   - Teacher signs in to access the control panel  
2. **Question Setup**
   - Add questions manually in the admin panel, or  
   - Upload bulk questions via CSV/JSON  
3. **Exam Configuration**
   - Set timer per question (default: 25 seconds)  
   - Choose randomized question order  
4. **Student Join**
   - Students enter their full name to join the exam session  
5. **Quiz Display**
   - Questions are shown **one at a time**, with a countdown  
   - Next question automatically appears after the timer  
6. **Answer Recording**
   - Students write answers on paper while the system ensures fairness  
