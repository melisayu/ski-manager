import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';

describe('App component', () => {
  it('should render SideBar', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  })
});
