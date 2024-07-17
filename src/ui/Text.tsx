export const Text = ({text, color, size}: {text: string, color: string, size: string}) => (
    <p style={{fontSize: size, color: color}}>{text}</p>
);