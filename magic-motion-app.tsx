"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Camera, ImageIcon, Play, Share, Download, Edit } from "lucide-react"

type Screen = "welcome" | "add-art" | "ai-detection" | "select-blocks" | "motion-settings" | "preview" | "video-ready"

export default function Component() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [speed1, setSpeed1] = useState([60])
  const [speed2, setSpeed2] = useState([70])

  const goToScreen = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  const goBack = () => {
    const screenOrder: Screen[] = [
      "welcome",
      "add-art",
      "ai-detection",
      "select-blocks",
      "motion-settings",
      "preview",
      "video-ready",
    ]
    const currentIndex = screenOrder.indexOf(currentScreen)
    if (currentIndex > 0) {
      setCurrentScreen(screenOrder[currentIndex - 1])
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onNext={() => goToScreen("add-art")} />
      case "add-art":
        return <AddArtScreen onNext={() => goToScreen("ai-detection")} onBack={goBack} />
      case "ai-detection":
        return <AIDetectionScreen onNext={() => goToScreen("select-blocks")} onBack={goBack} />
      case "select-blocks":
        return <SelectBlocksScreen onNext={() => goToScreen("motion-settings")} onBack={goBack} />
      case "motion-settings":
        return (
          <MotionSettingsScreen
            onNext={() => goToScreen("preview")}
            onBack={goBack}
            speed1={speed1}
            setSpeed1={setSpeed1}
            speed2={speed2}
            setSpeed2={setSpeed2}
          />
        )
      case "preview":
        return <PreviewScreen onNext={() => goToScreen("video-ready")} onBack={goBack} />
      case "video-ready":
        return <VideoReadyScreen onRestart={() => goToScreen("welcome")} onBack={goBack} />
      default:
        return <WelcomeScreen onNext={() => goToScreen("add-art")} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[375px] bg-white rounded-[32px] shadow-2xl overflow-hidden">{renderScreen()}</div>
    </div>
  )
}

function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="p-6 pb-8 min-h-[812px] flex flex-col">
      {/* Logo */}
      <div className="flex justify-center mb-8 mt-4">
        <div className="w-16 h-16 bg-gradient-to-br from-red-400 via-yellow-400 to-green-400 rounded-2xl flex items-center justify-center shadow-lg">
          <div className="text-white font-bold text-lg">LT</div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black leading-tight">
          <span className="bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
            MAGIC
          </span>
        </h1>
        <h1 className="text-5xl font-black leading-tight -mt-2">
          <span className="bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
            MOTION
          </span>
        </h1>
      </div>

      {/* Start Button */}
      <Button
        onClick={onNext}
        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-2xl shadow-lg mb-8 border-0"
      >
        Start New Project
      </Button>

      {/* Recent Videos */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Videos</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Rainbow Swirl</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Star Dance</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Magic Circles</p>
              <p className="text-xs text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddArtScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="p-6 min-h-[812px] flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold text-gray-900">Add Your Art</h2>
      </div>

      {/* Image Placeholder */}
      <div className="flex-1 mb-6">
        <div className="aspect-square bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 rounded-3xl flex items-center justify-center mb-6 border border-gray-200">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-md">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4 mb-6">
        <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-2xl shadow-lg border-0">
          <Camera className="w-5 h-5 mr-2" />
          Take Photo
        </Button>

        <Button
          onClick={onNext}
          variant="outline"
          className="w-full h-14 text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-2xl bg-white text-gray-700 hover:bg-gray-50"
        >
          <ImageIcon className="w-5 h-5 mr-2" />
          Choose from Gallery
        </Button>
      </div>

      {/* Checkbox */}
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox id="manual" className="rounded border-gray-300" />
        <label htmlFor="manual" className="text-sm text-gray-600">
          Start with Manual Object Selection
        </label>
      </div>

      {/* Help Text */}
      <div className="p-4 bg-gray-50 rounded-2xl">
        <p className="text-sm text-gray-600 text-center">
          Take a photo of your art or drawing or choose one from your gallery to get started!
        </p>
      </div>
    </div>
  )
}

function AIDetectionScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="p-6 min-h-[812px] flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold text-gray-900">AI Detection</h2>
      </div>

      {/* Image with Overlays */}
      <div className="flex-1 mb-6">
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-200">
          {/* Background artwork simulation */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-yellow-200"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-green-300 via-blue-300 to-yellow-300 rounded-2xl"></div>

          {/* Detected objects */}
          <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-pink-400 rounded-2xl shadow-lg opacity-80 transform rotate-12"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-blue-400 rounded-full shadow-lg opacity-80"></div>

          {/* Selection indicators */}
          <div className="absolute top-1/4 left-1/3 w-20 h-20 border-4 border-yellow-400 rounded-2xl transform rotate-12"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 border-4 border-yellow-400 rounded-full"></div>
        </div>
      </div>

      {/* AI Detection Result */}
      <div className="mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4">
          <p className="text-center text-gray-700 font-medium">AI found 2 objects in your artwork</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-4">
        <Button
          variant="outline"
          className="w-full h-12 text-base font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-2xl bg-white text-gray-700 hover:bg-gray-50"
        >
          Retry AI Detection
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 text-base font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-2xl bg-white text-gray-700 hover:bg-gray-50"
        >
          Switch to Manual Selection
        </Button>

        <Button
          onClick={onNext}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-2xl shadow-lg border-0"
        >
          Continue with AI Selection
        </Button>
      </div>
    </div>
  )
}

function SelectBlocksScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="p-6 min-h-[812px] flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold text-gray-900">Select Blocks</h2>
      </div>

      {/* Image with Overlays */}
      <div className="flex-1 mb-6">
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-200">
          {/* Background artwork simulation */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-yellow-200"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-green-300 via-blue-300 to-yellow-300 rounded-2xl"></div>

          {/* Detected objects with labels */}
          <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-pink-400 rounded-2xl shadow-lg opacity-80 transform rotate-12"></div>
          <div className="absolute top-1/4 left-1/3 w-20 h-20 border-4 border-yellow-400 rounded-2xl transform rotate-12"></div>
          <div className="absolute top-[15%] left-[25%] bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
            1
          </div>

          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-blue-400 rounded-full shadow-lg opacity-80"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 border-4 border-yellow-400 rounded-full"></div>
          <div className="absolute bottom-[35%] right-[20%] bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
            2
          </div>
        </div>
      </div>

      {/* Block List */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl border border-pink-100">
          <div className="w-6 h-6 bg-pink-400 rounded flex items-center justify-center text-white text-xs font-bold">
            1
          </div>
          <Input
            defaultValue="blue doll"
            className="flex-1 border-0 bg-transparent text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
          <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
            2
          </div>
          <Input
            defaultValue="blue doll"
            className="flex-1 border-0 bg-transparent text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      {/* Add Block Button */}
      <Button
        variant="outline"
        className="w-full h-12 text-base font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-2xl bg-white text-gray-700 hover:bg-gray-50 mb-4"
      >
        Add New Block
      </Button>

      {/* Continue Button */}
      <Button
        onClick={onNext}
        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-2xl shadow-lg border-0"
      >
        Continue to Animation
      </Button>
    </div>
  )
}

function MotionSettingsScreen({
  onNext,
  onBack,
  speed1,
  setSpeed1,
  speed2,
  setSpeed2,
}: {
  onNext: () => void
  onBack: () => void
  speed1: number[]
  setSpeed1: (value: number[]) => void
  speed2: number[]
  setSpeed2: (value: number[]) => void
}) {
  return (
    <div className="p-6 min-h-[812px] flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold text-gray-900">Motion Settings</h2>
      </div>

      {/* Object A Settings */}
      <div className="mb-6">
        <div className="p-4 bg-pink-50 rounded-2xl border border-pink-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-pink-400 rounded flex items-center justify-center text-white text-xs font-bold">
              1
            </div>
            <span className="font-semibold text-gray-900">blue doll</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Animation Type</label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-pink-400 hover:bg-pink-500 text-white rounded-xl px-4 py-2 text-xs font-semibold"
                >
                  Launch
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl px-4 py-2 text-xs font-semibold bg-white border-gray-200"
                >
                  Rotate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl px-4 py-2 text-xs font-semibold bg-white border-gray-200"
                >
                  Move
                </Button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Speed</label>
                <span className="text-sm text-gray-500">{speed1[0]}/100</span>
              </div>
              <Slider value={speed1} onValueChange={setSpeed1} max={100} step={1} className="w-full" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Sound Effect</label>
              <div className="w-6 h-6 bg-pink-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Object B Settings */}
      <div className="mb-8">
        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
              2
            </div>
            <span className="font-semibold text-gray-900">blue doll</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Animation Type</label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl px-4 py-2 text-xs font-semibold bg-white border-gray-200"
                >
                  Launch
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-400 hover:bg-blue-500 text-white rounded-xl px-4 py-2 text-xs font-semibold"
                >
                  Rotate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl px-4 py-2 text-xs font-semibold bg-white border-gray-200"
                >
                  Move
                </Button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Speed</label>
                <span className="text-sm text-gray-500">{speed2[0]}/100</span>
              </div>
              <Slider value={speed2} onValueChange={setSpeed2} max={100} step={1} className="w-full" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Sound Effect</label>
              <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Button */}
      <Button
        onClick={onNext}
        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-2xl shadow-lg border-0"
      >
        Preview Animation
      </Button>
    </div>
  )
}

function PreviewScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="p-6 min-h-[812px] flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold text-gray-900">Preview</h2>
      </div>

      {/* Preview Image */}
      <div className="flex-1 mb-6">
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-200">
          {/* Background artwork simulation */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-yellow-200"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-green-300 via-blue-300 to-yellow-300 rounded-2xl"></div>

          {/* Objects */}
          <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-pink-400 rounded-2xl shadow-lg opacity-80 transform rotate-12"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-blue-400 rounded-full shadow-lg opacity-80"></div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl">
              <Play className="w-8 h-8 text-gray-700 ml-1" />
            </div>
          </div>

          {/* Tap to play text */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <p className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">Tap to play preview</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl">
            <span className="text-sm text-gray-600">Background</span>
            <span className="text-sm font-semibold text-gray-900">ON</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl">
            <span className="text-sm text-gray-600">Sound</span>
            <span className="text-sm font-semibold text-gray-900">ON</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 text-base font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-2xl bg-white text-gray-700 hover:bg-gray-50"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={onNext}
        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-2xl shadow-lg border-0"
      >
        Generate Video
      </Button>
    </div>
  )
}

function VideoReadyScreen({ onRestart, onBack }: { onRestart: () => void; onBack: () => void }) {
  return (
    <div className="p-6 min-h-[812px] flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-xl">✨</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900">Your video is ready!</h2>
        </div>
      </div>

      {/* Video Preview */}
      <div className="flex-1 mb-6">
        <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200 mb-4">
          {/* Background artwork simulation */}
          <div className="relative w-full h-full bg-gradient-to-br from-green-200 via-blue-200 to-yellow-200">
            <div className="absolute inset-2 bg-gradient-to-br from-green-300 via-blue-300 to-yellow-300 rounded-xl"></div>

            {/* Objects */}
            <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-pink-400 rounded-lg shadow-lg opacity-80 transform rotate-12"></div>
            <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-blue-400 rounded-full shadow-lg opacity-80"></div>

            {/* Play indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-4 h-4 text-gray-700 ml-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Smaller preview */}
        <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200 w-32 mx-auto">
          <div className="relative w-full h-full bg-gradient-to-br from-green-200 via-blue-200 to-yellow-200">
            <div className="absolute inset-1 bg-gradient-to-br from-green-300 via-blue-300 to-yellow-300 rounded-lg"></div>
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-pink-400 rounded shadow-lg opacity-80"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-blue-400 rounded-full shadow-lg opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onRestart}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-2xl shadow-lg border-0"
        >
          Replay Video
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 text-base font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-2xl bg-white text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Save to Device
          </Button>

          <Button
            variant="outline"
            className="flex-1 h-12 text-base font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-2xl bg-white text-gray-700 hover:bg-gray-50"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        <Button
          onClick={onRestart}
          variant="ghost"
          className="w-full h-12 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
        >
          Create Another Video
        </Button>
      </div>
    </div>
  )
}
