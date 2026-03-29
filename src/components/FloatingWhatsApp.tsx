const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.126.554 4.195 1.604 6.014L.012 24l6.115-1.603c1.76.953 3.751 1.455 5.904 1.455 6.646 0 12.03-5.385 12.03-12.031C24.062 5.385 18.677 0 12.031 0zM12.03 21.821c-1.8 0-3.565-.483-5.11-1.4l-.366-.217-3.793.995.996-3.702-.238-.378a9.982 9.982 0 0 1-1.536-5.302c0-5.514 4.49-10.003 10.047-10.003 5.513 0 10.002 4.489 10.002 10.003 0 5.514-4.489 10.003-10.002 10.003zM17.534 14.31c-.302-.15-1.785-.88-2.062-.982-.277-.1-.478-.15-.68.15s-.78.981-.955 1.182c-.176.2-.351.226-.653.076-1.666-.824-2.859-1.55-3.99-3.415-.176-.301.176-.277.753-1.43.1-.2.05-.376-.025-.526-.075-.15-.68-1.631-.93-2.233-.244-.588-.492-.508-.68-.518-.175-.008-.376-.01-.577-.01-.2 0-.527.075-.803.376-.276.301-1.054 1.03-1.054 2.511s1.079 2.91 1.229 3.11c.15.201 2.122 3.238 5.141 4.54.718.308 1.278.492 1.714.63.72.23 1.375.196 1.892.119.578-.087 1.785-.73 2.036-1.433.251-.704.251-1.306.175-1.433-.075-.126-.276-.2-.577-.35z" />
  </svg>
);

import { trackWhatsAppClick } from "@/lib/analytics";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/966501921835"
      onClick={trackWhatsAppClick}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-float"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8 text-white" />
    </a>
  );
};

export default FloatingWhatsApp;
