"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Brain, Mic, Settings, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  TEACHING_STYLES,
  VOICE_TYPES,
  subjects,
} from "@/constants";
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Companion is required",
  }),
  subject: z.string().min(1, {
    message: "Subject is required",
  }),
  topic: z.string().min(1, {
    message: "Topic is required",
  }),
  voice: z.string().min(1, {
    message: "Voice is required",
  }),
  style: z.string().min(1, {
    message: "Style is required",
  }),
  duration: z.coerce.number().min(1, {
    message: "Duration is required",
  }),
});

const CompanionForm = () => {
  const [personality, setPersonality] = useState([50]);
  const [expertise, setExpertise] = useState([75]);
  const [patience, setPatience] = useState([80]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 5,
    },
  });

 const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companion = await createCompanion(values);

    if (companion) {
      redirect(`/companions/${companion.id}`);
    } else {
      console.log("Failed to create companion");
      redirect("/");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Set up the fundamental details of your AI Companion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Companion Name</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="Ex. JavaScript Expert"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="capitalize">
                              <SelectValue placeholder="Select subject Area" />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem
                                  key={subject.value}
                                  value={subject.value}
                                  className="capitalize"
                                >
                                  {subject.value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description">
                        What should your companion help with?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Ex. React for beginners..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Expertise Areas</Label>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "TypeScript", "APIs", "Testing"].map(
                      (tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer"
                        >
                          {tag} ×
                        </Badge>
                      )
                    )}
                    <Button variant="outline" size="sm" type="button">
                      + Add Tag
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Personality & Teaching Style
                </CardTitle>
                <CardDescription>
                  Customize how your companion interacts and teaches
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teaching Style</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select teaching style" />
                          </SelectTrigger>
                          <SelectContent>
                            {TEACHING_STYLES.map((style) => (
                              <SelectItem key={style.value} value={style.value}>
                                {style.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Personality (Formal ↔ Casual)</Label>
                    <Slider
                      value={personality}
                      onValueChange={setPersonality}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Very Formal</span>
                      <span>Balanced</span>
                      <span>Very Casual</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Expertise Level</Label>
                    <Slider
                      value={expertise}
                      onValueChange={setExpertise}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Beginner Friendly</span>
                      <span>Intermediate</span>
                      <span>Expert Level</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Patience Level</Label>
                    <Slider
                      value={patience}
                      onValueChange={setPatience}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Direct</span>
                      <span>Balanced</span>
                      <span>Very Patient</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="mr-2 h-5 w-5" />
                  Voice & Communication
                </CardTitle>
                <CardDescription>
                  Configure voice settings and communication preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Voice Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select voice" />
                            </SelectTrigger>
                            <SelectContent>
                              {VOICE_TYPES.map((voice) => (
                                <SelectItem
                                  key={voice.value}
                                  value={voice.value}
                                >
                                  {voice.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Estimated session duration in minutes
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="5"
                            {...field}
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="useExamples"
                    render={({ field }) => (
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Use Examples</Label>
                          <p className="text-sm text-gray-500">
                            Include practical examples in explanations
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="askFollowups"
                    render={({ field }) => (
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Ask Follow-up Questions</Label>
                          <p className="text-sm text-gray-500">
                            Engage with questions to check understanding
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="provideEncouragement"
                    render={({ field }) => (
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Provide Encouragement</Label>
                          <p className="text-sm text-gray-500">
                            Offer positive reinforcement during learning
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>See how your tutor will appear</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="h-12 w-12 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {form.watch("name") || "Tutor Name"}
                </h3>
                <p className="text-sm text-gray-600">
                  {form.watch("subject") || "Subject"}
                </p>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">TypeScript</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Advanced Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Public Tutor</Label>
                      <p className="text-sm text-gray-500">
                        Allow others to use this tutor
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="recordSessions"
                render={({ field }) => (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Session Recording</Label>
                      <p className="text-sm text-gray-500">
                        Save sessions for review
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                )}
              />
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button
            className="w-full"
            size="lg"
            onClick={form.handleSubmit(onSubmit)}
          >
            Create Tutor
          </Button>
          <Button variant="outline" className="w-full" type="button">
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanionForm;
