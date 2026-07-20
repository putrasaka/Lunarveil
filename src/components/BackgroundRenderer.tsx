import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function BackgroundRenderer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [useWebGL, setUseWebGL] = useState<boolean | null>(null);

  // Mouse interaction state
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);

  // WebGL availability check
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const isAvailable = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setUseWebGL(isAvailable);
    } catch {
      setUseWebGL(false);
    }
  }, []);

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse positions between -1 and 1
      mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Mode 1: Three.js WebGL rendering
  useEffect(() => {
    if (useWebGL !== true || !containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create Abstract Torus Knot Geometry (wireframe)
    // parameters: radius, tube, tubularSegments, radialSegments, p, q
    const geometry = new THREE.TorusKnotGeometry(6, 1.8, 120, 12, 3, 4);
    
    const material = new THREE.MeshBasicMaterial({
      color: 0xCAAA98, // Glow Sand color
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Subtle atmospheric light in case of shader reactions (even with BasicMaterial, keeps scene clean)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // Animation Loop
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Slow auto-rotation
      torusKnot.rotation.x += 0.0008;
      torusKnot.rotation.y += 0.0012;

      // Smoothly interpolate towards mouse target
      targetX += (mouseX.current - targetX) * 0.05;
      targetY += (mouseY.current - targetY) * 0.05;

      // React to mouse by shifting rotation slightly
      torusKnot.rotation.x += targetY * 0.002;
      torusKnot.rotation.y += targetX * 0.002;

      // Gently scale up and down based on mouse distance
      const distance = Math.sqrt(mouseX.current * mouseX.current + mouseY.current * mouseY.current);
      const targetScale = 1 + distance * 0.08;
      torusKnot.scale.x += (targetScale - torusKnot.scale.x) * 0.05;
      torusKnot.scale.y += (targetScale - torusKnot.scale.y) * 0.05;
      torusKnot.scale.z += (targetScale - torusKnot.scale.z) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [useWebGL]);

  // Mode 2: HTML5 Canvas 2D Fallback
  useEffect(() => {
    if (useWebGL !== false || !containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Node interface
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 70);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationFrameId: number;

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      // Draw and update particles
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Keep inside boundaries
        if (p.x < 0) p.x = 0;
        if (p.x > width) p.x = width;
        if (p.y < 0) p.y = 0;
        if (p.y > height) p.y = height;

        // Interactive mouse force (subtle push)
        const mx = ((mouseX.current + 1) / 2) * width;
        const my = ((-mouseY.current + 1) / 2) * height;
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(202, 170, 152, 0.25)'; // glow sand color
        ctx.fill();

        // Connect particles that are close
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distx = p.x - p2.x;
          const disty = p.y - p2.y;
          const distance = Math.sqrt(distx * distx + disty * disty);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Opacity fades as distance increases
            const opacity = (1 - distance / 120) * 0.12;
            ctx.strokeStyle = `rgba(202, 170, 152, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });
    };

    draw();

    // Resize handler
    const handleResize = () => {
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [useWebGL]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-navy opacity-65"
      style={{ mixBlendMode: 'screen' }}
      id="bg-renderer-container"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        id="bg-renderer-canvas"
      />
    </div>
  );
}
