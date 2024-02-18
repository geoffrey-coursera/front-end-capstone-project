export { Icon as default };

const Icon = ({ src, h=20, w=20 }) => (
    <img src={src} aria-hidden="true" alt="" height={h} width={w} />
);