import schema from './schema';
import controlComponent from './SlugControl';
import previewComponent from './SlugPreview';

const SlugWidget = () => {
  return {
    name: 'slug',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export {
  controlComponent as slugControl,
  previewComponent as slugPreview,
  schema as slugSchema,
};

export default SlugWidget;
