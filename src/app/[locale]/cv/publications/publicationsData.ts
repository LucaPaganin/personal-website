// Define the Publication type
export interface Publication {
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  doi?: string;
  url?: string;
  abstract?: string;
  tags?: string[];
}

// Publications data
export const publications: Publication[] = [
  {
    title:
      "Sentient Spaces: Intelligent Totem Use Case in the ECSEL FRACTAL Project",
    authors: [
      "Federica Caruso",
      "Tania Di Mascio",
      "Daniele Frigioni",
      "Luigi Pomante",
      "Giacomo Valente",
      "Stefano Delucchi",
      "Paolo Burgio",
      "Manuel Di Frangia",
      "Luca Paganin",
      "Chiara Garibotto",
      "Damiano Vallocchia",
    ],
    journal: "IEEE",
    year: 2022,
    url: "https://ieeexplore.ieee.org/document/9996615",
    abstract:
      `This paper presents the implementation of intelligent totem systems as part of the ECSEL FRACTAL project, 
      focusing on creating responsive environments through embedded AI and sensor networks.`,
    tags: ["embedded systems", "AI", "IoT"],
  },
  {
    title: "Euclid preparation: 6x2pt analysis for Euclid main probes",
    authors: [
      "Luca Paganin",
      "Marco Bonici",
      "Carmelita Carbone",
      "Stefano Camera",
      "Isaac Tutusaus",
      "et al."
    ],
    journal: "Astronomy & Astrophysics",
    year: 2024,
    url: "https://arxiv.org/abs/2409.18882",
    doi: "10.48550/arXiv.2409.18882",
    abstract:
      `This work presents forecasts for cosmological constraints from a combined analysis of cosmic shear, galaxy clustering, 
       and galaxy-galaxy lensing for the Euclid space mission, utilizing a 6x2pt correlation function approach.`,
    tags: ["cosmology", "astrophysics", "dark energy"],
  },
  {
    title: "Euclid: Forecasts from the void-lensing cross-correlation",
    authors: [
      "Marco Bonici",
      "Carmelita Carbone",
      "Stefano Davini",
      "Pauline Vielzeuf",
      "Luca Paganin",
      "et al."
    ],
    journal: "Astronomy & Astrophysics",
    year: 2021,
    url: "https://www.aanda.org/articles/aa/full_html/2023/02/aa44445-22/aa44445-22.html",
    doi: "10.1051/0004-6361/202244445",
    abstract:
      `This paper explores the potential of cosmic void-lensing cross-correlations as a cosmological probe 
       for the Euclid mission, providing forecasts for constraining cosmological parameters including dark energy properties.`,
    tags: ["cosmology", "voids", "weak lensing"],
  },
  {
    title:
      "A Proposal for Relative In-flight Flux Self-calibrations for Spectro-photometric Surveys",
    authors: [
      "S. Davini",
      "I. Risso",
      "M. Scodeggio",
      "L. Paganin",
      "et al."
    ],
    journal: "The Astronomical Journal",
    year: 2021,
    url: "https://iopscience.iop.org/article/10.1088/1538-3873/ac102e",
    doi: "10.1088/1538-3873/ac102e",
    abstract:
      `This work presents a novel methodology for self-calibration of spectro-photometric instruments during survey 
       operations, improving the accuracy of flux calibration without requiring additional calibration observations.`,
    tags: ["instrumentation", "spectroscopy", "calibration"],
  },
  {
    title: "Improving the Euclid performance: from spectroscopic simulations to the 6x2pt statistics.",
    authors: ["L. Paganin"],
    journal: "Iris Unige",
    year: 2022,
    url: "https://hdl.handle.net/11567/1064238",
    doi: "",
    tags: ["cosmology", "astrophysics", "Euclid"],
    abstract:
      `This thesis develops simulation software for validating Euclid's spectroscopic data reduction pipeline, 
      enabling accurate extraction of galaxy spectra from NISP instrument observations. The author also 
      conducted cosmological parameter forecasts incorporating correlations between weak lensing, photometric and 
      spectroscopic galaxy clustering, pioneering the so-called 6x2pt analysis in the Euclid mission context.
      This analysis had the aim to understand if all the correlations between the different probes
      could be used to improve the Euclid performance, therefore enhancing dark energy constraints resulting from the mission.`,
  }
];
