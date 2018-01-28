/* eslint no-unused-expressions: "off" */
import { expect } from 'chai';
import { shallow } from 'avoriaz';
import ProfileSubView from '@/src/admin/sub-views/ProfileSubView';

describe('AdminView.vue', () => {
  it('should render a page', () => {
    const wrapper = shallow(ProfileSubView);
    const header = wrapper.first('.admin__nav');
    expect(header).to.exist;
  });
});
