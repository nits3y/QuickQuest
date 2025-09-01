import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
            Q
          </div>
          <span className="text-xl font-bold">QuickQuest</span>
        </div>
     
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 lg:px-8">
        <div className="text-center py-20 lg:py-32">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Revolutionize Your{" "}
              <span className="text-primary">Classroom Exams</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              QuickQuest displays randomized questions with timers while students answer on paper. 
              Perfect for fair, controlled classroom examinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                Login as Teacher 🎓
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Join Exam 📝
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose QuickQuest?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for classroom environments to ensure fair and organized examinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl mb-4">
                🎲
              </div>
              <h3 className="text-xl font-semibold mb-2">Randomized Questions</h3>
              <p className="text-muted-foreground">
                Every exam session shuffles questions differently, ensuring fairness and preventing cheating.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl mb-4">
                ⏱️
              </div>
              <h3 className="text-xl font-semibold mb-2">Timed Questions</h3>
              <p className="text-muted-foreground">
                Customizable countdown timers per question (default: 25 seconds) keep exams on track.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl mb-4">
                📝
              </div>
              <h3 className="text-xl font-semibold mb-2">Paper-Based Answers</h3>
              <p className="text-muted-foreground">
                Students write answers on paper while the system controls the display - no digital distractions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl mb-4">
                🔑
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Teacher Login</h3>
              <p className="text-muted-foreground">
                Protected admin panel for teachers to manage exams, questions, and student sessions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl mb-4">
                ✍️
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Question Management</h3>
              <p className="text-muted-foreground">
                Create questions manually or upload in bulk using CSV/JSON files for quick setup.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl mb-4">
                🎓
              </div>
              <h3 className="text-xl font-semibold mb-2">Teacher Control Panel</h3>
              <p className="text-muted-foreground">
                Complete control over exam sessions, question timing, and student participation.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to conduct fair and organized classroom examinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Teacher Setup</h3>
              <p className="text-muted-foreground">
                Login to your admin panel and create or upload questions. Set timer preferences and exam configuration.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Students Join</h3>
              <p className="text-muted-foreground">
                Students enter their full name to join the exam session. No complex registration required.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Exam Begins</h3>
              <p className="text-muted-foreground">
                Questions appear one at a time with countdown timers. Students write answers on paper as questions advance automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="py-20">
          <div className="bg-card rounded-lg border p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Built with Modern Technology
              </h2>
              <p className="text-muted-foreground">
                Powered by industry-leading tools for reliability and performance
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="text-2xl mb-2">⚛️</div>
                <span className="font-medium">Next.js</span>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">🗄️</div>
                <span className="font-medium">MySQL</span>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">🎨</div>
                <span className="font-medium">Tailwind CSS</span>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">🔐</div>
                <span className="font-medium">NextAuth.js</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm font-bold">
                Q
              </div>
              {/* "QuickQuest" is bold, and "by Yestin Prado" is smaller and less prominent */}
              <span className="font-semibold">QuickQuest</span>
              <span className="text-xs text-muted-foreground ml-2 align-bottom">by Yestin Prado</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 QuickQuest. Built for educators, by educators.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
