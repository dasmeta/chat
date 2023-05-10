import TextInput from './TextInput';
import Search from './Search';
import Password from './Password';

const Inputs: any = TextInput;
Inputs.Search = Search;
Inputs.Password = Password;

export default Inputs as {
  Search: typeof Search;
  Password: typeof Password;
} & typeof TextInput;
