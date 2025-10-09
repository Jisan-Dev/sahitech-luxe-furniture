import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "The quality of furniture exceeded my expectations. The velvet sofa is absolutely stunning and so comfortable!",
    rating: 5,
    image: "/professional-woman.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Interior Designer",
    content:
      "I regularly recommend this store to my clients. Their collection is curated beautifully and the customer service is exceptional.",
    rating: 5,
    image: "/professional-man.png",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Business Owner",
    content:
      "Furnished my entire office with their pieces. Professional, timely delivery, and the furniture looks amazing!",
    rating: 5,
    image: "/business-woman.png",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-muted/30 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-foreground mb-6 leading-relaxed text-pretty">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
