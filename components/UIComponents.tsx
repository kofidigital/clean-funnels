
import React from 'react';

export const Card: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  title?: string;
  action?: React.ReactNode;
}> = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-surface border border-borderSubtle rounded-lg transition-all duration-200 ${className}`}>
      {(title || action) && (
        <div className="px-4 py-3 border-b border-borderSubtle flex justify-between items-center bg-panel/30">
          {title && <h3 className="text-[12px] font-medium text-textMain tracking-wide">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}> = ({ children, onClick, variant = 'primary', className = '', disabled = false, size = 'md', icon }) => {
  
  const baseStyles = "rounded-md font-normal transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  // Scaled down sizes (approx 15-20% smaller)
  const sizes = {
    sm: "text-[11px] px-2.5 py-1 h-7",
    md: "text-[12px] px-3.5 py-1.5 h-8",
    lg: "text-[13px] px-5 py-2 h-9"
  };

  const variants = {
    primary: "bg-accent-primary text-page hover:bg-white shadow-glow hover:shadow-glow/80",
    secondary: "bg-panel text-textMain border border-borderSubtle hover:border-borderHighlight hover:bg-panel/80",
    outline: "bg-transparent border border-borderSubtle text-textSecondary hover:text-textMain hover:border-textSecondary/50",
    ghost: "bg-transparent text-textSecondary hover:text-textMain hover:bg-panel",
    danger: "text-red-400 hover:text-red-300 bg-red-500/5 border border-red-500/10 hover:bg-red-500/10"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {icon && <span className="opacity-80 scale-90">{icon}</span>}
      {children}
    </button>
  );
};

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'neutral' | 'orange';
  className?: string;
}> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: "bg-panel border-borderSubtle text-textMain",
    outline: "bg-transparent border-borderSubtle text-textSecondary",
    success: "bg-green-500/5 text-green-400 border-green-500/10",
    neutral: "bg-white/5 text-textSecondary border-transparent",
    orange: "bg-orange-500/5 text-orange-400 border-orange-500/10"
  };

  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    {...props} 
    className={`w-full bg-transparent border border-borderSubtle rounded-md px-3 py-1.5 text-[12px] text-textMain placeholder:text-textTertiary focus:outline-none focus:border-borderHighlight focus:bg-panel/50 transition-all ${props.className}`} 
  />
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea 
    {...props} 
    className={`w-full bg-transparent border border-borderSubtle rounded-md px-3 py-2 text-[13px] leading-relaxed text-textMain placeholder:text-textTertiary focus:outline-none focus:border-borderHighlight focus:bg-panel/50 transition-all resize-none ${props.className}`} 
  />
);

export const Separator: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`h-[1px] w-full bg-borderSubtle ${className}`} />
);
