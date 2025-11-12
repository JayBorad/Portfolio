'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Skill {
  name: string;
  level: number;
  category: string;
}

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({});

  const skills: Skill[] = [
    { name: 'JavaScript', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Frontend' },
    { name: 'React', level: 92, category: 'Frontend' },
    { name: 'Next.js', level: 88, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 93, category: 'Frontend' },
    { name: 'Node.js', level: 87, category: 'Backend' },
    { name: 'Python', level: 82, category: 'Backend' },
    { name: 'PostgreSQL', level: 85, category: 'Backend' },
    { name: 'Git', level: 90, category: 'Tools' },
    { name: 'Docker', level: 80, category: 'Tools' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            skills.forEach((skill, index) => {
              setTimeout(() => {
                let currentLevel = 0;
                const increment = skill.level / 50;
                const interval = setInterval(() => {
                  currentLevel += increment;
                  if (currentLevel >= skill.level) {
                    currentLevel = skill.level;
                    clearInterval(interval);
                  }
                  setAnimatedLevels((prev) => ({
                    ...prev,
                    [skill.name]: currentLevel,
                  }));
                }, 20);
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const categories = ['Frontend', 'Backend', 'Tools'];

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
            <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
              A comprehensive toolkit of technologies and frameworks I use to
              build exceptional digital experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, categoryIndex) => (
              <Card
                key={category}
                className={`p-6 transition-all duration-1000 hover:shadow-xl ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${categoryIndex * 200}ms` }}
              >
                <h3 className="text-xl font-bold mb-6 text-center">
                  {category}
                </h3>
                <div className="space-y-6">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground font-semibold">
                            {Math.round(animatedLevels[skill.name] || 0)}%
                          </span>
                        </div>
                        <div className="h-3 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg"
                            style={{
                              width: `${animatedLevels[skill.name] || 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
