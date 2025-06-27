
export interface Benefit {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}
