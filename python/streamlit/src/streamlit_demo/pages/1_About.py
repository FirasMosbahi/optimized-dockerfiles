"""About page for Streamlit demo."""
import streamlit as st

st.set_page_config(page_title="About", page_icon="ℹ️")

st.title("ℹ️ About This Application")

st.markdown("""
## Overview

This is a demo Streamlit application designed to showcase:

- **Interactive Visualizations**: Using Plotly for dynamic charts
- **Data Processing**: Pandas for data manipulation
- **Multi-page Support**: Navigation between different pages
- **Docker Optimization**: Multi-stage builds for production deployment

## Features

### 📊 Data Visualization
- Multiple chart types (Line, Bar, Scatter, Area)
- Interactive Plotly charts
- Real-time metric updates

### 🎛️ Interactive Controls
- Sidebar configuration
- Dynamic data generation
- Customizable visualizations

### 🐳 Docker Deployment
- **Optimized Build**: ~250 MB (vs ~600 MB basic)
- **Multi-stage**: Separates build and runtime
- **Production-ready**: Proper health checks and configuration

## Technology Stack

- **Streamlit**: Web app framework
- **Pandas**: Data manipulation
- **Plotly**: Interactive visualizations
- **Python 3.14**: Latest Python runtime
- **Docker**: Containerized deployment

## Performance

The optimized Docker image achieves:
- ✅ 60% size reduction
- ✅ Faster startup times
- ✅ Minimal runtime dependencies
- ✅ Production-grade health monitoring

## Author

Built with ❤️ by Firas Mosbahi

---

[Return to Home](/)
""")
