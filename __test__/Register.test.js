import { render } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

let auth = {};
const setAuth = (newAuth) => {
    auth = newAuth
};

const mockSubmit = jest.fn();

const navigation = () => false;

test('testing authfield for register', async () => {
    const title = "Register";
    const { getByText } = render(
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={mockSubmit}
            title={title}
            navigation={navigation}
        />
    );
    const header = await getByText(title);
    expect(header).toBeDefined();
})
