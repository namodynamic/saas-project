"use client";

import { useEffect, useRef, useState } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import {
  addToSessionHistory,
  endSessionHistory,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Mic,
  MicOff,
  Pause,
  Square,
  MessageSquare,
  BookOpen,
  Clock,
  PhoneOff,
  Phone,
} from "lucide-react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  voice,
  style,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handleSessionStart = async () => {
    const session = await addToSessionHistory(companionId);
    setSessionId(session.id);
  };

  const handleSessionEnd = async () => {
    if (sessionId) {
      await endSessionHistory(sessionId);
    }
  };

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      handleSessionStart();
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      handleSessionEnd();
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // @ts-expect-error ts(2349)
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
    handleSessionEnd();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Voice Session</span>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>15:32</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className="relative w-32 h-32 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: getSubjectColor(subject) }}
                  >
                    <div
                      className={cn(
                        "absolute transition-opacity duration-1000",
                        callStatus === CallStatus.FINISHED ||
                          callStatus === CallStatus.INACTIVE
                          ? "opacity-100"
                          : "opacity-0",
                        callStatus === CallStatus.CONNECTING &&
                          "opacity-100 animate-pulse"
                      )}
                    >
                      <Image
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={80}
                        height={80}
                        className="w-20 h-20"
                      />
                    </div>

                    <div
                      className={cn(
                        "absolute transition-opacity duration-1000",
                        callStatus === CallStatus.ACTIVE
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    >
                      <Lottie
                        lottieRef={lottieRef}
                        animationData={soundwaves}
                        autoplay={false}
                        className="w-24 h-24"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {subject}
                    </p>
                  </div>
                </div>

                {/* Connection Status */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-32 flex flex-col items-center max-md:hidden justify-center">
                    <div className="flex items-center space-x-1">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-1",
                            callStatus === CallStatus.ACTIVE &&
                              "bg-green-500/20 animate-pulse",
                            callStatus === CallStatus.CONNECTING &&
                              "bg-yellow-500/30 animate-pulse",
                            callStatus === CallStatus.INACTIVE && "bg-gray-300",
                            callStatus === CallStatus.FINISHED &&
                              "bg-red-500/30"
                          )}
                          style={{
                            height: `${Math.random() * 50}px`,
                            animationDelay: `${i * 0.01}s`,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs mt-2 text-gray-600">
                      {callStatus === CallStatus.ACTIVE && "Connected"}
                      {callStatus === CallStatus.CONNECTING && "Connecting..."}
                      {callStatus === CallStatus.INACTIVE && "Ready"}
                      {callStatus === CallStatus.FINISHED && "Ended"}
                    </span>
                  </div>
                </div>

                {/* User Avatar */}
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={userImage || "/placeholder.svg"}
                      alt={userName}
                    />
                    <AvatarFallback className="text-2xl">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{userName}</h3>
                    <p className="text-sm text-gray-600">Student</p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant={isMuted ? "destructive" : "outline"}
                  size="lg"
                  onClick={toggleMicrophone}
                  disabled={callStatus !== CallStatus.ACTIVE}
                  className="flex items-center space-x-2"
                >
                  {isMuted ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                  <span className="hidden sm:inline">
                    {isMuted ? "Unmute" : "Mute"}
                  </span>
                </Button>

                <Button
                  size="lg"
                  className={cn(
                    "flex items-center space-x-2",
                    callStatus === CallStatus.ACTIVE
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600",
                    callStatus === CallStatus.CONNECTING && "animate-pulse"
                  )}
                  onClick={
                    callStatus === CallStatus.ACTIVE
                      ? handleDisconnect
                      : handleCall
                  }
                  disabled={callStatus === CallStatus.CONNECTING}
                >
                  {callStatus === CallStatus.ACTIVE ? (
                    <>
                      <PhoneOff className="h-5 w-5" />
                      <span>End Session</span>
                    </>
                  ) : (
                    <>
                      <Phone className="h-5 w-5" />
                      <span>
                        {callStatus === CallStatus.CONNECTING
                          ? "Connecting..."
                          : "Start Session"}
                      </span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transcript */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Transcript
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message, index) =>
                message.role === "assistant" ? (
                  <div className="flex space-x-3" key={index}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback
                        style={{ backgroundColor: getSubjectColor(subject) }}
                      >
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {/* Todo: Add a timestamp here */}
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-3 justify-end" key={index}>
                    <div className="flex-1 max-w-xs">
                      <div className="bg-gray-100 rounded-lg p-3 ml-auto">
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {/* Todo: Add a timestamp here */}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={userImage || "/placeholder.svg"}
                        alt={userName}
                      />
                      <AvatarFallback>
                        {userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Session Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Session Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Time Elapsed</span>
                <span>15:32</span>
              </div>
              <Progress value={62} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Topics Covered</span>
                <span>2/4</span>
              </div>
              <Progress value={50} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Understanding</span>
                <span>85%</span>
              </div>
              <Progress value={85} />
            </div>
          </CardContent>
        </Card>

        {/* Learning Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Today&apos;s Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Understand async/await syntax
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Compare with promises
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                Error handling patterns
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                Practice exercises
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Quick Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Session Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Take notes during your session..."
              rows={6}
              className="resize-none"
            />
            <Button size="sm" className="mt-2 w-full">
              Save Notes
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              View Resources
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask Question
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <Pause className="mr-2 h-4 w-4" />
              Take Break
            </Button>

            <Button
              size="sm"
              className={cn(
                "w-full justify-start",
                callStatus === CallStatus.ACTIVE
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600",
                callStatus === CallStatus.CONNECTING && "animate-pulse"
              )}
              onClick={
                callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
              }
              disabled={callStatus === CallStatus.CONNECTING}
            >
              {callStatus === CallStatus.ACTIVE ? (
                <>
                  <Square className="mr-2 h-5 w-5" />
                  <span>End Session</span>
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-5 w-5" />
                  <span>
                    {callStatus === CallStatus.CONNECTING
                      ? "Connecting..."
                      : "Start Session"}
                  </span>
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default CompanionComponent;
