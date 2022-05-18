import { render } from '@testing-library/react-native';
import OrderList from '../components/OrderList';
// import renderer from 'react-test-renderer';

test('header should exist containing text Ready to be picked', async () => {
    fetch = jest.fn(() => Promise.resolve());
    const { getByText } = render(<OrderList />);
    const header = await getByText('Ready to be picked');
    expect(header).toBeDefined();
});
