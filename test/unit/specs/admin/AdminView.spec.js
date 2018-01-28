/* eslint no-unused-expressions: "off" */
import { expect } from 'chai';
import { shallow } from 'avoriaz';
import AdminView from '../../../../src/admin/AdminView';

describe('AdminView.vue', () => {
  it('should render a page', () => {
    const wrapper = shallow(AdminView);
    const header = wrapper.first('.admin__nav');
    expect(header).to.exist;
  });
});
