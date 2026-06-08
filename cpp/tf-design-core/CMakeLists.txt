cmake_minimum_required(VERSION 3.20)
project(tf_design_core VERSION 0.1.0 LANGUAGES CXX)

add_library(tf_design_core INTERFACE)
add_library(tfdesign::core ALIAS tf_design_core)

target_compile_features(tf_design_core INTERFACE cxx_std_20)
target_include_directories(tf_design_core INTERFACE
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
  $<INSTALL_INTERFACE:include>
)

option(TF_DESIGN_CORE_BUILD_TESTS "Build TF Design C++ Core tests" ON)

if(TF_DESIGN_CORE_BUILD_TESTS)
  enable_testing()
  add_executable(tf_design_core_tests tests/test_core.cpp)
  target_link_libraries(tf_design_core_tests PRIVATE tfdesign::core)
  add_test(NAME tf_design_core_tests COMMAND tf_design_core_tests)
endif()
