"""Main Streamlit application."""
import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime, timedelta
import random

# Page configuration
st.set_page_config(
    page_title="Streamlit Demo",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Title and description
st.title("📊 Streamlit Demo Application")
st.markdown("""
This is a demo Streamlit application showcasing various features:
- Interactive data visualization
- Real-time updates
- Multi-page support
- Dockerized deployment
""")

# Sidebar
with st.sidebar:
    st.header("Configuration")
    data_points = st.slider("Number of data points", 10, 100, 50)
    chart_type = st.selectbox("Chart Type", ["Line", "Bar", "Scatter", "Area"])
    st.divider()
    st.markdown("### About")
    st.info("Built with Streamlit and optimized with Docker multi-stage builds.")

# Generate sample data
@st.cache_data
def generate_data(n_points):
    """Generate sample time series data."""
    dates = [datetime.now() - timedelta(days=x) for x in range(n_points)]
    dates.reverse()

    data = {
        'Date': dates,
        'Sales': [random.randint(100, 1000) for _ in range(n_points)],
        'Revenue': [random.randint(5000, 20000) for _ in range(n_points)],
        'Customers': [random.randint(10, 100) for _ in range(n_points)]
    }
    return pd.DataFrame(data)

# Display data
df = generate_data(data_points)

# Metrics
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(
        label="Total Sales",
        value=f"{df['Sales'].sum():,}",
        delta=f"{df['Sales'].iloc[-1] - df['Sales'].iloc[-2]}"
    )

with col2:
    st.metric(
        label="Total Revenue",
        value=f"${df['Revenue'].sum():,}",
        delta=f"{df['Revenue'].iloc[-1] - df['Revenue'].iloc[-2]}"
    )

with col3:
    st.metric(
        label="Avg Customers/Day",
        value=f"{df['Customers'].mean():.0f}",
        delta=f"{df['Customers'].iloc[-1] - df['Customers'].mean():.0f}"
    )

with col4:
    st.metric(
        label="Data Points",
        value=len(df),
        delta="Live"
    )

st.divider()

# Visualization
st.subheader(f"{chart_type} Chart")

if chart_type == "Line":
    fig = px.line(df, x='Date', y=['Sales', 'Customers'], title='Sales and Customers Over Time')
elif chart_type == "Bar":
    fig = px.bar(df, x='Date', y='Revenue', title='Revenue Over Time')
elif chart_type == "Scatter":
    fig = px.scatter(df, x='Sales', y='Revenue', size='Customers', title='Sales vs Revenue')
else:  # Area
    fig = px.area(df, x='Date', y='Sales', title='Sales Over Time')

st.plotly_chart(fig, use_container_width=True)

# Data table
st.subheader("Data Table")
st.dataframe(df, use_container_width=True, hide_index=True)

# Download button
csv = df.to_csv(index=False).encode('utf-8')
st.download_button(
    label="Download data as CSV",
    data=csv,
    file_name='streamlit_demo_data.csv',
    mime='text/csv',
)

# Footer
st.divider()
st.caption("Streamlit Demo App | Optimized Docker Deployment")
