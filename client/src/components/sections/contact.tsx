import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { insertContactSchema, type InsertContact } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@nexulsly.com',
    bgColor: 'bg-primary-100',
    iconColor: 'text-primary-600'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: MapPin,
    title: 'Office',
    value: 'San Francisco, CA',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
];

export function ContactSection() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      projectType: '',
      message: ''
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" ref={ref} className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Let's discuss how we can transform your digital presence and drive meaningful results for your business.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  >
                    <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                      <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{info.title}</h4>
                      <p className="text-gray-600">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-slate-900">First Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John" 
                              className="rounded-xl border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-slate-900">Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Doe" 
                              className="rounded-xl border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-slate-900">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            className="rounded-xl border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-slate-900">Project Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200">
                              <SelectValue placeholder="Select a project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                            <SelectItem value="performance-optimization">Performance Optimization</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-slate-900">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            placeholder="Tell us about your project..." 
                            className="rounded-xl border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white text-lg px-8 py-4 rounded-xl font-semibold"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
