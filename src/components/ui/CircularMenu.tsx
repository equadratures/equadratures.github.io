import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { ReactSVG } from 'react-svg';

export default function CircularMenu() {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        gyroscope: false,
      });
    }

    const modalMap = {
      modal_s1_section: 'modal_s1',
      modal_s3_section: 'modal_s3',
      modal_s6_section: 'modal_s6',
      modal_s7_section: 'modal_s7',
      modal_s8_section: 'modal_s8',
    };

    const handlers: { svgElement: Element; handler: () => void }[] = [];

    for (const [svgId, modalId] of Object.entries(modalMap)) {
      const svgElement = document.getElementById(svgId);
      const modalInput = document.getElementById(modalId) as HTMLInputElement;

      if (svgElement && modalInput) {
        svgElement.style.cursor = 'pointer';

        const handler = () => {
          const file = modalInput.dataset.htmlFile;
          const target = document.getElementById('jupyterNotebook');
          if (target && file) {
            fetch(file)
              .then((res) => res.text())
              .then((html) => {
                target.innerHTML = html;
              });
          }
        };

        svgElement.addEventListener('click', handler);
        handlers.push({ svgElement, handler });
      }
    }

    return () => {
      handlers.forEach(({ svgElement, handler }) => {
        svgElement.removeEventListener('click', handler);
      });
    };
  }, []);

  return (
    <>
      <section className="flex justify-center items-center py-12">
        <div
          ref={tiltRef}
          className="tilt-elements w-full max-w-xl"
          data-tilt
          data-tilt-max="15"
          data-tilt-gyroscope="false"
        >
          <ReactSVG
            src="/imgs/circular_5_opt_2.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svg_content');
              svg.setAttribute('id', 'infographic');
            }}
            loading={() => <span>Loading SVG...</span>}
            fallback={() => <span>Error loading SVG</span>}
          />
        </div>

        {/* Hidden inputs with data-html-file attributes */}
        <input type="hidden" id="modal_s1" data-html-file="/modals/notebooks/polynomials-over-subspaces.html" />
        <input type="hidden" id="modal_s3" data-html-file="/modals/notebooks/polynomial-gradients.html" />
        <input type="hidden" id="modal_s6" data-html-file="/modals/notebooks/polynomial_chaos.html" />
        <input type="hidden" id="modal_s7" data-html-file="/modals/notebooks/polynomial-integration.html" />
        <input type="hidden" id="modal_s8" data-html-file="/modals/notebooks/polynomials-over-cubes.html" />
      </section>

      {/* Where the notebook HTML will be injected */}
      <div id="jupyterNotebook" className="mx-auto max-w-4xl px-4 py-8"></div>
    </>
  );
}

