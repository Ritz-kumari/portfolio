import { Component, useEffect, useRef } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Group, MathUtils } from 'three'

function StaticSculpture({ message }: { message: string }) {
  return <div className="static-scene"><div className="static-ring ring-one" /><div className="static-ring ring-two" /><div className="static-core" /><p role="status">{message}</p></div>
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unable to render the portfolio 3D scene.', error, info.componentStack)
  }

  render() {
    return this.state.failed
      ? <StaticSculpture message="3D preview is unavailable on this device. The rest of the portfolio is ready to explore." />
      : this.props.children
  }
}

function Sculpture({ animated }: { animated: boolean }) {
  const group = useRef<Group>(null)
  const knot = useRef<Group>(null)
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => { invalidate() }, [animated, invalidate])

  useFrame((state, delta) => {
    if (!group.current || !knot.current || !animated) return
    const elapsed = state.clock.elapsedTime
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.38, 3, delta)
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.2, 3, delta)
    group.current.position.y = Math.sin(elapsed * 0.65) * 0.08
    knot.current.rotation.y += delta * 0.15
    knot.current.rotation.z += delta * 0.07
  })

  return (
    <group ref={group} rotation={[0.08, -0.15, -0.08]}>
      <group ref={knot} rotation={[0.5, 0.3, -0.2]}>
        <mesh>
          <torusKnotGeometry args={[1.06, 0.3, 160, 24, 2, 3]} />
          <meshStandardMaterial color="#e1e4e8" metalness={1} roughness={0.17} />
        </mesh>
      </group>
      <mesh rotation={[0.9, 0.5, -0.45]}>
        <torusGeometry args={[1.98, 0.019, 12, 160]} />
        <meshStandardMaterial color="#ff8351" emissive="#fc6733" emissiveIntensity={0.38} metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh rotation={[-0.8, 0.7, 0.5]}>
        <torusGeometry args={[2.17, 0.012, 10, 160]} />
        <meshStandardMaterial color="#9c9690" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[1.54, 1.01, 0.9]}>
        <sphereGeometry args={[0.36, 32, 32]} />
        <meshStandardMaterial color="#ff5e25" metalness={0.35} roughness={0.23} />
      </mesh>
      <mesh position={[-1.57, -0.9, 0.55]}>
        <sphereGeometry args={[0.21, 24, 24]} />
        <meshStandardMaterial color="#a89ac9" metalness={0.45} roughness={0.16} />
      </mesh>
      <mesh position={[-1.52, 1.12, -0.32]} rotation={[0.4, 0.2, 0.5]}>
        <icosahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#b6c89d" metalness={0.4} roughness={0.22} />
      </mesh>
      <mesh position={[0.77, -1.62, 0.33]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#ff7d46" emissive="#ff6c2f" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

export default function SystemsScene({ animated }: { animated: boolean }) {
  return (
    <SceneBoundary>
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop={animated ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        fallback={<StaticSculpture message="WebGL is not supported. Enjoy the static sculpture and explore the portfolio below." />}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 5]} intensity={3} color="#fff4e6" />
        <pointLight position={[-3, -1, 3]} intensity={12} color="#ff7842" />
        <Environment resolution={128}>
          <Lightformer intensity={5} position={[0, 4, 0]} scale={[10, 2, 1]} />
          <Lightformer intensity={3} position={[-4, 0, 2]} rotation={[0, Math.PI / 2, 0]} scale={[5, 8, 1]} />
          <Lightformer intensity={2} position={[4, 1, -3]} rotation={[0, -Math.PI / 2, 0]} scale={[4, 6, 1]} color="#f8b693" />
          <Lightformer intensity={1} position={[0, -4, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 3, 1]} />
        </Environment>
        <Sculpture animated={animated} />
      </Canvas>
    </SceneBoundary>
  )
}
