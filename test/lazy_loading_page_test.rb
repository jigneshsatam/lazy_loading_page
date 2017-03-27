require 'test_helper'

class LazyLoadingPageTest < ActiveSupport::TestCase
  test "truth" do
    assert_kind_of Module, LazyLoadingPage
  end
end
