"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, Container, IOptions, MoveDirection, OutMode, RecursivePartial } from "@tsparticles/engine";

interface ParticlesComponentProps {
  id?: string;
  bgColor?: string;
  particleDensity?: number;
}

const ParticlesComponent = (props: ParticlesComponentProps) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    if (container) {
      console.log("Particles container loaded", container);
    }
  };

  const options: RecursivePartial<IOptions> = useMemo(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: -1
      },
      background: {
        color: {
          value: props.bgColor || "#111827"
        }
      },
      fpsLimit: 120,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "repulse"
          },
          onHover: {
            enable: false,
            mode: "none"
          },
        },
        modes: {
          repulse: {
            distance: 150,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ["#4ade80", "#22d3ee", "#60a5fa", "#a78bfa"]
        },
        move: {
          direction: "none" as MoveDirection, // Changed from "top" to "none"
          enable: true,
          outModes: {
            default: "out" as OutMode, // Changed from "destroy" to "out"
          },
          random: false,
          speed: 1,
          straight: false, // Changed to false to allow for looping
          path: {
            enable: true,
            options: {
              path: {
                type: "path",
                data: "M 0 0 L 0 1", // Vertical path
              },
              size: {
                width: 100,
                height: 100
              },
              scale: 1,
              steps: 100
            }
          }
        },
        number: {
          value: props.particleDensity || 300,
          density: {
            enable: true,
            area: 800,
          },
        },
        opacity: {
          value: 0.7,
          animation: {
            enable: false,
          },
        },
        shape: {
          type: "circle"
        },
        size: {
          value: {
            min: 0.5,
            max: 2.5
          },
          random: true,
        },
        life: {
          duration: {
            sync: false,
            value: 3
          },
          count: 0
        },
      },
      detectRetina: true,
      emitters: {
        direction: "top",
        life: {
          count: 0,
          duration: 0.1,
          delay: 0.1
        },
        rate: {
          delay: 0.1,
          quantity: 5
        },
        size: {
          width: 100, // Increased width for better distribution
          height: 0 // Changed height to 0 to emit from a line
        },
        position: {
          x: 50,
          y: 100
        }
      }
    }),
    [props.bgColor, props.particleDensity]
  );

  if (!init) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
      <Particles
        id={props.id || "tsparticles"}
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </div>
  );
};

export default ParticlesComponent;