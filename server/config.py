import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Configuration class that loads settings from environment variables"""
    
    def __init__(self):
        self.mongo_username = self._get_env_var('MONGO_USERNAME')
        self.mongo_password = self._get_env_var('MONGO_PASSWORD')
        self.mongo_host = self._get_env_var('MONGO_HOST')
        self.mongo_database = self._get_env_var('MONGO_DATABASE')
        self.flask_env = os.getenv('FLASK_ENV', 'development')
        self.flask_debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    def _get_env_var(self, var_name: str) -> str:
        """Get environment variable with proper error handling"""
        value = os.getenv(var_name)
        if not value:
            raise ValueError(f"Environment variable {var_name} is required but not set")
        return value
    
    def get_mongodb_connection_string(self) -> str:
        """Generate MongoDB connection string from environment variables"""
        return f"mongodb+srv://{self.mongo_username}:{self.mongo_password}@{self.mongo_host}/{self.mongo_database}?retryWrites=true&w=majority"
    
    def validate_config(self) -> bool:
        """Validate that all required configuration is present"""
        required_vars = [
            self.mongo_username,
            self.mongo_password, 
            self.mongo_host,
            self.mongo_database
        ]
        return all(var for var in required_vars)

# Global config instance
config = Config() 