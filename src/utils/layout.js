import dagre from 'dagre';

const NODE_WIDTH = 250;
const NODE_HEIGHT = 300;

export const getLayoutedElements = (nodes, edges) => {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: 'TB', nodesep: 70, ranksep: 100 });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = g.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - NODE_WIDTH / 2,
        y: nodeWithPosition.y - NODE_HEIGHT / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

// it is for default nodes
export const getInitialNodes = () => [
  {
    id: 'home',
    type: 'home',
    data: { 
      label: 'Home',
      sections: [
        { id: 'hero', title: 'Hero' },
        { id: 'features', title: 'Features' },
        { id: 'testimonials', title: 'Testimonials' },
        { id: 'cta', title: 'CTA' },
        { id: 'footer', title: 'Footer' },
      ],
      onChange: ({ sections }) => {}
    },
    position: { x: 0, y: 0 },
    className: 'light'
  },
  {
    id: 'about',
    data: { label: 'About' },
    position: { x: 0, y: 100 },
    className: 'light',
  },
  {
    id: 'services',
    data: { label: 'Services' },
    position: { x: 0, y: 200 },
    className: 'light',
  },
  {
    id: 'blog',
    data: { label: 'Blog' },
    position: { x: 0, y: 300 },
    className: 'light',
  },
  {
    id: 'contact',
    data: { label: 'Contact' },
    position: { x: 0, y: 400 },
    className: 'light',
  },
  {
    id: 'service-detail-1',
    data: { label: 'Service Detail 1' },
    position: { x: 0, y: 500 },
    className: 'light',
  },
  {
    id: 'service-detail-2',
    data: { label: 'Service Detail 2' },
    position: { x: 0, y: 600 },
    className: 'light',
  },
  {
    id: 'blog-post-1',
    data: { label: 'Blog Post 1' },
    position: { x: 0, y: 700 },
    className: 'light',
  },
  {
    id: 'blog-post-2',
    data: { label: 'Blog Post 2' },
    position: { x: 0, y: 800 },
    className: 'light',
  },
  {
    id: 'author-page',
    data: { label: 'Author Page' },
    position: { x: 0, y: 900 },
    className: 'light',
  },
  {
    id: 'location-info',
    data: { label: 'Location Info' },
    position: { x: 0, y: 1000 },
    className: 'light',
  },
  {
    id: 'support-page',
    data: { label: 'Support Page' },
    position: { x: 0, y: 1100 },
    className: 'light',
  },
];

// it is for default connections
export const getInitialEdges = () => [
  { id: 'home-about', source: 'home', target: 'about' },
  { id: 'home-services', source: 'home', target: 'services' },
  { id: 'home-blog', source: 'home', target: 'blog' },
  { id: 'home-contact', source: 'home', target: 'contact' },
  { id: 'services-detail1', source: 'services', target: 'service-detail-1' },
  { id: 'services-detail2', source: 'services', target: 'service-detail-2' },
  { id: 'blog-post1', source: 'blog', target: 'blog-post-1' },
  { id: 'blog-post2', source: 'blog', target: 'blog-post-2' },
  { id: 'blog-author', source: 'blog', target: 'author-page' },
  { id: 'contact-location', source: 'contact', target: 'location-info' },
  { id: 'contact-support', source: 'contact', target: 'support-page' },
];