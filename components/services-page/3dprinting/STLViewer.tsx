"use client"

import React, { useEffect, useState, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Center } from '@react-three/drei'
import * as THREE from 'three'
import { STLLoader } from 'three-stdlib'
import { useTheme } from 'next-themes'
import styles from './STLViewer.module.css'

interface STLViewerProps {
  url: string
}

function STLModel({ url, color }: { url: string, color: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    let mounted = true
    const loader = new STLLoader()
    
    loader.load(
      url,
      (geo) => {
        if (!mounted) return
        
        geo.computeBoundingBox()
        geo.computeVertexNormals()
        
        const center = new THREE.Vector3()
        geo.boundingBox?.getCenter(center)
        geo.translate(-center.x, -center.y, -center.z)
        
        setGeometry(geo)
      },
      (progress) => console.log('Loading:', (progress.loaded / progress.total * 100).toFixed(0) + '%'),
      (error) => console.error('Error loading STL:', error)
    )

    return () => { mounted = false }
  }, [url])

  if (!geometry) return null

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial 
        color={color} 
        roughness={0.4} 
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function CameraAdjuster() {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.set(100, 100, 100)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera])
  return null
}

export default function STLViewer({ url }: STLViewerProps) {
  const { theme } = useTheme()
  const [key, setKey] = useState(0)

  useEffect(() => { setKey(prev => prev + 1) }, [url])

  // Set colors based on theme
  const isDark = theme === 'dark'
  const backgroundColor = isDark ? '#1a1a2e' : '#ffffff'
  const gridColor = isDark ? '#555555' : '#cccccc'
  const gridCenterColor = isDark ? '#333333' : '#888888'
  const modelColor = isDark ? '#4a90e2' : '#0077ff'

  return (
    <div className={styles.window}>
      <Canvas
        key={key}
        camera={{ position: [100, 100, 100], fov: 50, near: 0.1, far: 10000 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={[backgroundColor]} />
        
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        <hemisphereLight intensity={0.5} groundColor="#444444" />
        
        <Center>
          <STLModel url={url} color={modelColor} />
        </Center>
        
        <CameraAdjuster />
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} minDistance={10} maxDistance={500} autoRotate autoRotateSpeed={1.5} />
        
        <gridHelper args={[200, 40, gridColor, gridCenterColor]} position={[0, -50, 0]} />
      </Canvas>
    </div>
  )
}
