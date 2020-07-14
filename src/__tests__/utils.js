import {render} from '@testing-library/svelte';

function renderComponent(Comp, props) {
  return render(Comp, {
    props: {...props}
  });
}

export {renderComponent};
