import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type ParticleFieldProps = {
  variant?: 'particles' | 'wireframe';
};

export default function ParticleField({ variant = 'particles' }: ParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    if (variant === 'wireframe') {
      const geometry = new THREE.IcosahedronGeometry(2.1, 1);
      const material = new THREE.MeshBasicMaterial({
        color: 0xc9a84c,
        wireframe: true,
        transparent: true,
        opacity: 0.18
      });
      group.add(new THREE.Mesh(geometry, material));
    } else {
      const geometry = new THREE.BufferGeometry();
      const count = 360;
      const positions = new Float32Array(count * 3);
      for (let index = 0; index < count; index += 1) {
        positions[index * 3] = (Math.random() - 0.5) * 12;
        positions[index * 3 + 1] = (Math.random() - 0.5) * 7;
        positions[index * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color: 0xe8c97a,
        size: 0.018,
        transparent: true,
        opacity: 0.52
      });
      group.add(new THREE.Points(geometry, material));
    }

    let frame = 0;
    let raf = 0;

    const animate = () => {
      frame += 0.006;
      group.rotation.x = Math.sin(frame) * 0.14;
      group.rotation.y += 0.0028;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const resize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', resize);
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [variant]);

  return <div ref={mountRef} aria-hidden="true" />;
}
