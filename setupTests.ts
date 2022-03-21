import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MutationObserver from 'mutation-observer'

global.MutationObserver = MutationObserver 
configure({ adapter: new Adapter() })
