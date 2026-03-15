import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Zap, Heart, Trophy } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              About ZeroBG AI
            </h1>
            <p className="text-xl text-muted-foreground">
              Created by Pankaj Kumar | A journey of learning and innovation
            </p>
          </div>

          {/* About Creator Section */}
          <Card className="mb-12 p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700">
            <h2 className="text-3xl font-bold mb-6 gradient-text">About the Creator</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  Academic Background
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a first-year Computer Science and Engineering student at NIT Durgapur, 
                  just beginning my journey into the world of technology and programming. With a deep 
                  interest in coding, I enjoy exploring how things work behind the scenes in software 
                  and systems.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Technical Focus
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Currently, I'm focused on building a strong foundation in programming, 
                  especially in languages like C++ and Python, while also learning about data 
                  structures and algorithms.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">C++</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">Data Structures</Badge>
                  <Badge variant="outline">Algorithms</Badge>
                  <Badge variant="outline">Full Stack</Badge>
                  <Badge variant="outline">Web Development</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-400" />
                  Goals & Aspirations
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm eager to get involved in college tech communities, participate in hackathons, 
                  and collaborate on projects that help me grow both technically and personally. 
                  I'm excited to learn, connect, and make the most of my time at NIT Durgapur!
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  Beyond Coding
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Outside of the tech world, I'm passionate about sports and gaming. I love playing 
                  cricket and badminton, enjoying online games, and I'm constantly excited to learn 
                  new things. I believe in maintaining a healthy balance between technical growth 
                  and personal interests.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Cricket</Badge>
                  <Badge variant="secondary">Badminton</Badge>
                  <Badge variant="secondary">Gaming</Badge>
                  <Badge variant="secondary">Learning</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* About ZeroBG AI */}
          <Card className="p-8 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-700/50">
            <h2 className="text-3xl font-bold mb-6 gradient-text">About ZeroBG AI</h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                ZeroBG AI is an innovative AI-powered background removal tool designed to make 
                image editing accessible to everyone. Whether you're a content creator, designer, 
                or just someone who needs to remove backgrounds quickly, ZeroBG AI does it instantly.
              </p>
              
              <p>
                This project showcases modern web technologies including React, TypeScript, Vite, 
                and integration with AI services. It's a demonstration of how machine learning can 
                be leveraged to solve real-world problems elegantly.
              </p>

              <p>
                Built with a focus on user experience and performance, ZeroBG AI represents my 
                passion for creating practical solutions that make a difference in people's workflows.
              </p>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm">
                  <span className="font-semibold">Website Owner:</span> Pankaj Kumar<br />
                  <span className="font-semibold">Institution:</span> NIT Durgapur<br />
                  <span className="font-semibold">Academic Level:</span> First Year CSE Student
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
