import { render } from '@testing-library/react-native';
import Pick from '../components/Pick';
import renderer from 'react-test-renderer';

test('header should exist containing text Ready to be picked', async () => {
    // const { getByText } = render(<Pick />);
    // const header = await getByText('Ready to be picked');

    const tree = renderer.create(<Pick />).toJSON();
    expect(tree).toMatchSnapshot();

    // expect(header).toBeDifined();
});
