import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactInformation() {
  return (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-6">
        <h3 className="font-serif text-xl font-bold mb-4">Contact Information</h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium">Visit our showroom</p>
              <p className="text-sm text-muted-foreground">
                123 Furniture Street
                <br />
                New York, NY 10001
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium">Call us</p>
              <p className="text-sm text-muted-foreground">(555) 123-4567</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium">Email us</p>
              <p className="text-sm text-muted-foreground">contact@luxefurniture.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground rounded-lg p-6">
        <h3 className="font-serif text-xl font-bold mb-2">Business Hours</h3>
        <div className="space-y-1 text-sm">
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 5:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
}
