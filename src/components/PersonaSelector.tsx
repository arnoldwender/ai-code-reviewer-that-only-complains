/* Persona dropdown — select the tone of the reviewer */
import { PERSONAS } from '../data/personas';
import type { Persona } from '../data/personas';

interface PersonaSelectorProps {
  selectedId: string;
  onChange: (persona: Persona) => void;
  disabled: boolean;
}

export default function PersonaSelector({ selectedId, onChange, disabled }: PersonaSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const persona = PERSONAS.find((p) => p.id === e.target.value);
    if (persona) onChange(persona);
  };

  return (
    <div className="mb-4">
      <label className="text-[0.62rem] tracking-[3px] text-terminal-orange/50 mb-2 block">
        SELECT YOUR REVIEWER:
      </label>
      <select
        value={selectedId}
        onChange={handleChange}
        disabled={disabled}
        className="w-full bg-terminal-dark border border-terminal-orange/20 text-terminal-orange font-mono text-xs p-2.5 outline-none appearance-none cursor-pointer transition-all duration-200 hover:border-terminal-orange/40 focus:border-terminal-orange/40 focus:shadow-[0_0_20px_rgba(255,102,0,0.08)] disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23ff6600' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 10px center',
        }}
      >
        {PERSONAS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
