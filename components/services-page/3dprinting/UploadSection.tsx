"use client"

import React, { useState, useRef, useEffect } from "react"
import styles from "./UploadSection.module.css"

import { FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import dynamic from "next/dynamic"
import * as THREE from "three"
import { STLLoader } from "three-stdlib"

// Load STL viewer without SSR
const STLViewer = dynamic(() => import("./STLViewer"), { ssr: false })

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [volume, setVolume] = useState(0)
  const [weight, setWeight] = useState(0)
  const [time, setTime] = useState(0)
  const [price, setPrice] = useState(0)

  const [material, setMaterial] = useState("PLA")
  const [infill, setInfill] = useState(20)
  const [qty, setQty] = useState(1)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const densities: Record<string, number> = {
    PLA: 1.24,
    PETG: 1.27,
    ABS: 1.05,
    ASA: 1.07,
    TPU: 1.20,
  }

  const pricePerGram = 12
  const machineCostPerHour = 50
  const gramsPerHour = 15

  /** ---------- ANALYZE STL ---------- */
  const analyzeSTL = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer()
    const loader = new STLLoader()
    const geometry = loader.parse(arrayBuffer) as THREE.BufferGeometry

    geometry.computeBoundingBox()
    geometry.computeVertexNormals()

    const position = geometry.getAttribute("position")
    let totalVolume = 0

    for (let i = 0; i < position.count; i += 3) {
      const p1 = new THREE.Vector3().fromBufferAttribute(position, i)
      const p2 = new THREE.Vector3().fromBufferAttribute(position, i + 1)
      const p3 = new THREE.Vector3().fromBufferAttribute(position, i + 2)

      totalVolume += p1.dot(p2.clone().cross(p3)) / 6
    }

    const volumeCm3 = Math.abs(totalVolume) / 1000
    setVolume(volumeCm3)
  }

  /** ---------- RECALCULATE WHEN SETTINGS CHANGE ---------- */
  useEffect(() => {
    if (!file || volume <= 0) return

    const density = densities[material]
    const grams = volume * density * (infill / 100)
    setWeight(grams)

    const hours = grams / gramsPerHour
    setTime(hours)

    const totalPrice = (grams * pricePerGram + hours * machineCostPerHour) * qty
    setPrice(Math.round(totalPrice))
  }, [material, infill, qty, volume, file])

  /** ---------- FILE UPLOAD ---------- */
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded) return

    if (fileUrl) URL.revokeObjectURL(fileUrl)

    setFile(uploaded)
    const newUrl = URL.createObjectURL(uploaded)
    setFileUrl(newUrl)
    analyzeSTL(uploaded)
  }

  /** ---------- CLEANUP ---------- */
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl)
    }
  }, [fileUrl])

  return (
    <section className={styles.section}>
      {/* Left: Upload & Preview */}
      <div className={styles.upload}>
        {!file ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileUp />
              </EmptyMedia>
              <EmptyTitle>No Uploads Yet</EmptyTitle>
              <EmptyDescription>Upload an STL file to begin.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={() => fileInputRef.current?.click()}>
                Upload File
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                accept=".stl"
                hidden
                onChange={handleUpload}
              />
            </EmptyContent>
          </Empty>
        ) : (
          <div className={styles.previewBox}>
            <STLViewer url={fileUrl || ""} />
          </div>
        )}
      </div>

      {/* Right: Controls */}
      <div className={styles.controls}>
        <div>
          <label>Select Material</label>
          <Select value={material} onValueChange={setMaterial}>
            <SelectTrigger className={styles.selectTrigger}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.keys(densities).map((mat) => (
                  <SelectItem key={mat} value={mat}>
                    {mat}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label>Infill Density</label>
          <Select
            value={String(infill)}
            onValueChange={(v) => setInfill(Number(v))}
          >
            <SelectTrigger className={styles.selectTrigger}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[20, 30, 40, 50, 60, 70, 80, 90, 100].map((i) => (
                  <SelectItem key={i} value={String(i)}>
                    {i}%
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label>Quantity</label>
          <Input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </div>

        {file && (
          <div className={styles.results}>
            <h3>Estimated Cost</h3>
            <div className={styles.resultsContainer}>
              <div className={styles.resultsWrapper}>
                <h4>Volume</h4>
                <p>{volume.toFixed(2)} cm³</p>
              </div>
              <div className={styles.resultsWrapper}>
                <h4>Weight</h4>
                <p>{weight.toFixed(2)} g</p>
              </div>
              <div className={styles.resultsWrapper}>
                <h4>Print Time</h4>
                <p>{time.toFixed(2)} hrs</p>
              </div>
              <div className={styles.resultsWrapper}>
                <h4>Total Price</h4>
                <p className={styles.price}>{price} BDT</p>
              </div>
            </div>
          </div>
        )}

        <div className={styles.buttons}>
          <Button>Place Order</Button>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Clear View
          </Button>
        </div>
      </div>
    </section>
  )
}
