import React from 'react';

interface IProps {}
interface IState { hasError: boolean }

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log('Error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ops, algo salió mal..</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;