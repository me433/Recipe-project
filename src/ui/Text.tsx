export const Text = ({text, color, size}: {text: string, color:string, size:number}) => (
    <p style={{fontSize: size, color: color}}>{text}</p>
);