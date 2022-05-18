import { render } from '@testing-library/react-native';
import DeliveryList from '../components/DeliveryList';

const deliveries = [{
        amount: 1,
        comment: null,
        delivery_date: "2022-01-01",
        id: 123,
        product_id: 123456,
        product_name: "Test1",
    },
    {
        amount: 2,
        comment: null,
        delivery_date: "2022-01-02",
        id: 456,
        product_id: 6587,
        product_name: "Test2",
    },
    {
        amount: 3,
        comment: null,
        delivery_date: "2022-01-03",
        id: 789,
        product_id: 8522,
        product_name: "Test3",
    }
]

const setDeliveries = () => false;

test('testing deliverylist returns list with at least three items', async () => {
    fetch = jest.fn(() => Promise.resolve());
    const { getByText } = render(
        <DeliveryList
            deliveries={deliveries}
            setDeliveries={setDeliveries}
        />
    )

    const test1 = await getByText('Test1', { exact: false });
    const test2 = await getByText('Test2', { exact: false });
    const test3 = await getByText('Test3', { exact: false });


    expect(test1).toBeDefined();
    expect(test2).toBeDefined();
    expect(test3).toBeDefined();
});
