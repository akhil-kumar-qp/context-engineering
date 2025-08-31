import React from 'react'

interface ICustomErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class CustomErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ICustomErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error: Error): ICustomErrorBoundaryState {
    return {hasError: true, error}
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      )
    }

    return this.props.children
  }
}
