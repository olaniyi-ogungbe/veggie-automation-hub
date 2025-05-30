
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Star, Truck, Clock, DollarSign, CheckCircle, Phone, Mail } from 'lucide-react';

const LandingPage = () => {
  const products = [
    { name: 'Bell Peppers', varieties: 'Yellow, Red, Green' },
    { name: 'Peppers & Onions', varieties: 'Atarodo, Shombo, Tatashe, Habaneros, Onions' },
    { name: 'Fresh Tomatoes', varieties: 'Plum, Cherry' },
    { name: 'Tubers', varieties: 'Yams, Potatoes' }
  ];

  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6 text-veggie-600" />,
      title: 'Affordable Prices',
      description: 'We partner with farmers to ensure you get the best prices.'
    },
    {
      icon: <Star className="h-6 w-6 text-veggie-600" />,
      title: 'Great Quality',
      description: 'We carefully sort and package every item to ensure top-notch quality.'
    },
    {
      icon: <Truck className="h-6 w-6 text-veggie-600" />,
      title: 'Quick Delivery',
      description: 'We process your orders swiftly and deliver every item in great condition.'
    }
  ];

  const upcomingFeatures = [
    'Personalized ordering',
    'Seamless tracking',
    'Faster checkout',
    'Online payment'
  ];

  const handleWhatsAppOrder = () => {
    window.open('https://wa.me/2348107134415', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-veggie-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl text-veggie-700">
              Veggie<span className="text-veggie-500">World</span>
            </div>
            <Button onClick={handleWhatsAppOrder} className="bg-green-500 hover:bg-green-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              Order Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Fresh, Affordable and Just a Message Away
          </h1>
          <h2 className="text-3xl font-semibold text-veggie-700 mb-6">
            Welcome to Veggie World
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            At Veggie World, we make it easy to buy fresh fruits and vegetables in Lagos. 
            Whether you're shopping for your home or your business, we deliver high-quality 
            produce directly to your doorstep.
          </p>
          <Button 
            onClick={handleWhatsAppOrder}
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-lg px-8 py-4"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Click Here to Order via WhatsApp
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-lg text-gray-600">Explore our selection of farm-fresh produce:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {products.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.varieties}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button onClick={handleWhatsAppOrder} variant="outline" size="lg">
              <MessageSquare className="h-4 w-4 mr-2" />
              View Complete List & Pricing on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-veggie-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Veggie World?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button onClick={handleWhatsAppOrder} size="lg" className="bg-green-500 hover:bg-green-600">
              <MessageSquare className="h-5 w-5 mr-2" />
              Click Here to Order via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">We're Evolving for You</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're upgrading our platform to serve you better!
            </p>
            <p className="text-lg text-gray-600 mb-8">Soon, you'll enjoy:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {upcomingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-center md:justify-start">
                  <CheckCircle className="h-5 w-5 text-veggie-600 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-600 mb-8">All in one place.</p>
            <p className="text-xl font-semibold text-veggie-700">Thanks for growing with us!</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-veggie-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Place Your Order Now</h2>
          <p className="text-xl mb-8">Ready to get fresh veggies delivered to your doorstep?</p>
          <Button 
            onClick={handleWhatsAppOrder}
            size="lg"
            className="bg-white text-veggie-600 hover:bg-gray-100 text-lg px-8 py-4"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Click Here to Order via WhatsApp
          </Button>
          <div className="mt-8 pt-8 border-t border-veggie-500">
            <p className="text-veggie-100 mb-4">For any inquiries, feel free to reach out to us:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:info@veggieworld.africa" className="flex items-center text-white hover:text-veggie-200">
                <Mail className="h-4 w-4 mr-2" />
                info@veggieworld.africa
              </a>
              <a href="tel:+2348107134415" className="flex items-center text-white hover:text-veggie-200">
                <Phone className="h-4 w-4 mr-2" />
                +234 810 713 4415
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Us</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Veggie World is an agri-food tech company based in Lagos, Nigeria, delivering fresh, 
                high-quality fruits and vegetables to homes, restaurants, and grocery retailers.
              </p>
              <p>
                We work directly with local farmers and producers to source a wide range of fresh 
                produce—from bell peppers and tomatoes to yams and onions. By shortening the supply 
                chain, we offer better prices and fresher products.
              </p>
              <p>
                Our produce is sorted, cleaned, and packaged in hygienic conditions at our 
                distribution hub. Whether you're a home cook, a professional chef, or a store owner, 
                we ensure that every item delivered is handled with care and arrives in excellent condition.
              </p>
              <p>
                Our tech-enabled platform helps us manage inventory efficiently, process orders 
                promptly, and deliver quickly. For busy households, we offer convenience and 
                consistency. For food businesses, we provide quality items and quick delivery. 
                And for retailers, we are a dependable bulk supply partner with competitive prices.
              </p>
              <p className="font-semibold text-veggie-700">
                At Veggie World, we're building a smarter, faster, and more reliable way to access 
                fresh food. We continuously support local agriculture while making fresh produce 
                easily accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="font-bold text-xl mb-4">
            Veggie<span className="text-veggie-400">World</span>
          </div>
          <p className="text-gray-400">
            &copy; 2023 Veggie World. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
