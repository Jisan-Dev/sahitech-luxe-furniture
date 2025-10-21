import { Award, Heart, Leaf, Users } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Quality Craftsmanship",
      description:
        "We believe in creating furniture that lasts generations, combining traditional techniques with modern design.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Our commitment to the environment means using eco-friendly materials and sustainable manufacturing practices.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We provide exceptional service and support throughout your journey with us.",
    },
    {
      icon: Award,
      title: "Innovation",
      description:
        "We continuously evolve our designs and processes to bring you the latest in furniture innovation.",
    },
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      bio: "With 20 years of experience in furniture design, Sarah founded Luxe to bring elegant, affordable furniture to everyone.",
    },
    {
      name: "James Chen",
      role: "Head of Design",
      bio: "James leads our creative team, blending contemporary aesthetics with timeless elegance in every piece.",
    },
    {
      name: "Emma Rodriguez",
      role: "Operations Manager",
      bio: "Emma ensures every order is handled with care, maintaining our commitment to excellence in customer service.",
    },
    {
      name: "Michael Thompson",
      role: "Sustainability Officer",
      bio: "Michael oversees our environmental initiatives, ensuring we meet the highest standards of sustainability.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Luxe Furniture
          </h1>
          <p className="text-lg text-muted-foreground text-pretty mb-8">
            Crafting beautiful, sustainable furniture that transforms houses into homes. Since 2004,
            we've been dedicated to bringing elegance and comfort to every space.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-muted py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Luxe Furniture was born from a simple vision: to create beautiful, high-quality
                furniture that doesn't compromise on style or sustainability. What started as a
                small workshop in Brooklyn has grown into a trusted name in home furnishings.
              </p>
              <p>
                Our founder, Sarah Mitchell, spent years searching for the perfect furniture for her
                own home. Frustrated by the lack of options that combined elegance, durability, and
                environmental responsibility, she decided to create them herself.
              </p>
              <p>
                Today, we work with skilled artisans and sustainable suppliers from around the world
                to bring you furniture that tells a story. Every piece in our collection is
                carefully curated to ensure it meets our exacting standards for quality, design, and
                sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <p className="text-lg text-foreground leading-relaxed">
              To provide exceptional, sustainably-crafted furniture that enhances the beauty and
              comfort of homes while respecting our planet. We believe that quality furniture should
              be accessible to everyone, and that style and sustainability can go hand in hand.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-muted py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-background rounded-lg p-6 border border-border">
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="w-16 h-16 bg-primary rounded-full mb-4"></div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif text-4xl font-bold mb-2">20+</div>
              <p className="text-sm opacity-90">Years of Experience</p>
            </div>
            <div>
              <div className="font-serif text-4xl font-bold mb-2">50K+</div>
              <p className="text-sm opacity-90">Happy Customers</p>
            </div>
            <div>
              <div className="font-serif text-4xl font-bold mb-2">500+</div>
              <p className="text-sm opacity-90">Unique Designs</p>
            </div>
            <div>
              <div className="font-serif text-4xl font-bold mb-2">100%</div>
              <p className="text-sm opacity-90">Sustainable Materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
